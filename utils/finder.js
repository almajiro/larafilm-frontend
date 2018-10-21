export default {
  methods: {
    findBackground(images) {
      return this.finder(images, 8)
    },
    findLogo(images) {
      return this.finder(images, 0)
    },
    findPoster(images) {
      return this.finder(images, 1)
    },
    finder(images, type) {
      var url = ''

      images.forEach(function (image) {
        if (image.type === type) {
          url = image.asset.file
        }
      })
      return url
    },
    prettyString(str, limit = 250) {
      var thisStr = ''

      if (str.length > limit) {
        thisStr = str.slice(0, limit) + '...'
      } else {
        thisStr = str
      }

      return thisStr
    }
  }
}
