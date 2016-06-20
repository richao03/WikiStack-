var utils = {


    generateUrlTitle: function(title) {
      console.log('run');
        if (title) {
            // Removes all non-alphanumeric characters from title
            // And make whitespace underscore
            return title.replace(/\s+/g, '_').replace(/\W/g, '');
        } else {
            // Generates random 5 letter string
            return Math.random().toString(36).substring(2, 7);
        }
    }

}


module.exports = utils;
