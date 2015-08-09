export default class Parsec {
  constructor({ operandsKey = "_", noFlags = true, sliceIndex = 2 }) {
    this._endOfOpts = false
    /** @type {String} */
    this.operandsKey = operandsKey
    /** @type {Boolean} */
    this.noFlags = noFlags
    /** @type {Number} */
    this.sliceIndex = sliceIndex
  }
  /**
    @param {String[]} args
    @param {Object} opts
    @param {Parsec} $ Instance of Parsec
   */
   static parse(args, opts = {}, $ = new Parsec(opts) ) {
     return function (contains) {
       for (let { key, value } of $.entries(args.slice($.sliceIndex))) {
         if (this[key] === undefined) {
           this[key] = value
         } else if (!contains(this[key], value)) {
           this[key] = [].concat(this[key], value)
         }
       }
       /**
         @param {String|Array} keys
         @param {Object} opts Object describing option mappings.
        */
       this.options = (keys, opts) => {
         keys = Array.isArray(keys) ? keys : [keys, keys.charAt(0)]
         value => {
           keys.forEach((key) =>
             this[key] = (value !== undefined )
               ? value
               : (opts !== undefined)
                 ? opts.default
                 : value)
         }(this[keys.filter((key) => this[key] !== undefined)])
         return this
       }
       return this
     }.call({}, (k, v) => k === v || Array.isArray(k) && ~k.indexOf(v))
   }
  /**
    @param {Array} args
    @param {String} operandsKey
    @return {{ key, value }}
  */
  *entries(args) {
    let isBool = (obj) =>
      typeof obj === "boolean" || obj === "true" || obj === "false"

    for (let { curr, next, value } of this.tokens(args)) {
      if (curr.isBare) {
        if (this.isEndOfOpts(curr.token)) continue
        yield { key: this.operandsKey, value: curr.token }
      } else {
        if (this.noFlags && isBool(value) && curr.isNoFlag) {
          curr.token = curr.noKey
          value = (value === "false")
            ? true
            : (value === "true")
              ? false
              : !value
        }
        yield { key: curr.token, value }
      }
    }
  }
  /**
    @param {Array} args
    @return {{ curr, next, value }}
  */
  *tokens(args) {
    for (let { prev, curr, next } of this.tuples(this.map(args))) {
      if (curr === undefined) continue
      if (curr.isLong) {
        yield {
          prev, curr,
          value: (curr.value !== undefined)
            ? curr.value
            : next !== undefined && next.isBare
              ? next.token
              : true
        }
      } else if (curr.isShort) {
        yield* this.shorts(this.tuples(curr.tokens, next))
      } else {
        if (prev !== undefined) {
          if (prev.isLong && prev.value === undefined) continue
          if (prev.isShort && isNaN(prev.tokens.pop())) continue
        }
        yield { prev, curr }
      }
    }
  }
  /**
    @param {Token} *iterator
    @return {{ curr: {Token}, value }}
  */
  *shorts(iterator) {
    for (let { curr, next, last } of iterator) {
      if (!isNaN(curr)) continue
      yield {
        curr: { token: curr },
        value: (next === undefined && last !== undefined
        && last.isBare && !this.isEndOfOpts(last.token))
          ? last.token
          : (!isNaN(next))
            ? next
            : true
      }
    }
  }
  /**
    @param {Array} args
    @return {{Token[]}}
  */
  map(args) {
    return args.map((token) => {
      if (!this._endOfOpts) {
        this._endOfOpts = this.isEndOfOpts(token)

        if (/^-[a-z]/i.test(token)) {
          const TOKENS = /([+-]?(\.?\d+\d+)?)|([a-z])/ig
          return {
            isShort: true,
            tokens: token.slice(1).split(TOKENS).filter(_=>_)
          }
        }

        if (/^--[a-z]/i.test(token)) {
          return (([key, value]) => ({
            isLong: true,
            key, value, token: key.slice(2),
            isNoFlag: /^--no-([^-\n]{1}.*$)/.test(key),
            noKey: key.replace(/^--no-([^-\n]{1}.*$)/, "$1")
          }))((pair => [pair.shift(), pair[0]])(token.split("=")))
        }
      }

      return { token, isBare: token !== undefined }
    })
  }
  /**
    @param {Array|String} list List to iterate.
    @param {Object} [last] Define to use as the last value.
    @param {Object} [prev] Define to use as the first prev value.
    @param {Object} [curr] Define to use as the first curr value.
    @return { prev, curr, next } for each item in a list.
  */
  *tuples(list, last, prev, curr) {
    for (let next of list) {
      if (curr !== undefined) yield { prev, curr, next }
      prev = curr
      curr = next
    }
    yield { prev, curr, last }
  }
  /**
    @param {String} token
  */
  isEndOfOpts(token) {
    return /^--[-]*$/.test(token)
  }
}
