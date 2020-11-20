@react.component
let make = (~words: MaybeWords.maybeWords) => {
  <div>
  { switch(words) {
      | Error => React.string("Huh?")
      | Words(list{}) => React.string("Loading...")
      | Words(words) => React.string(String.concat(" ", words))
    }
  }
  </div>
}

  
