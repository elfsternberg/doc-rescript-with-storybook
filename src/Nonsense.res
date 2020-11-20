@react.component
let make = _ => {
  let (state, setState) = React.useState(_ => MaybeWords.Words(list{}))

  Random.self_init()

  let fm = Belt.Option.flatMap

  let decodeWord = (json: Js.Json.t): option<string> => {
    Js.Json.decodeObject(json)
      -> fm(object_ => Js.Dict.get(object_, "words"))
      -> fm(Js.Json.decodeArray)
      -> fm(words => Belt.Array.get(words, 0))
      -> fm(Js.Json.decodeString)
  }

  let gotWords = (words': list<string>): unit => {
    setState(state =>
             switch(state) {
             | Error => Error
             | Words(words) => Words(List.append(words, words'))
             }
    )
  }

  let isVowel = (letter: char): bool =>
    List.mem(letter, list{'a', 'e', 'i', 'o', 'u'})

  let gotWord = (set: string, word: string) =>
    switch(set) {
      | "nouns"
      | "objects" =>
        switch(Random.int(2)) {
        | 0 => gotWords(list{"the", word})
        | _ when isVowel( String.get(word, 0) ) => gotWords(list{"an", word})
        | _ => gotWords(list{"a", word})
        }
      | _ => gotWords(list{word})
    }

  let andthen = Js.Promise.then_

  let getWord = (~set: string): Js.Promise.t<unit> => {
    Fetch.fetch("https://api.noopschallenge.com/wordbot?set=" ++ set)
    |> andthen(Fetch.Response.json)
    |> andthen(json => { 
        switch(decodeWord(json)) {
          | None => setState(_ => Error)
          | Some(word) => gotWord(set, word)
        }
        Js.Promise.resolve()
      })
  }

  React.useEffect0(() => {
    getWord(~set="nouns")
    |> andthen(_ => getWord(~set = "verbs_past"))
    |> andthen(_ => getWord(~set = "objects"))
    |> andthen(_ =>
      switch Random.int(100) {
        | n when n < 30 => getWord(~set = "adverbs")
        | _ => Js.Promise.resolve()
      })
    |> ignore
    None
  })

  <Noncard words={state} />
}
    
