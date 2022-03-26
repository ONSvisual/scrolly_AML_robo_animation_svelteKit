<script>
  let Intersection = {}
  Intersection.intersectShapes = function (shape1, shape2) {
    var ip1 = shape1.getIntersectionParams()
    var ip2 = shape2.getIntersectionParams()
    var result
    if (ip1 != null && ip2 != null) {
      if (ip1.name == 'Path') {
        result = Intersection.intersectPathShape(shape1, shape2)
      } else if (ip2.name == 'Path') {
        result = Intersection.intersectPathShape(shape2, shape1)
      } else {
        var method
        var params
        if (ip1.name < ip2.name) {
          method = 'intersect' + ip1.name + ip2.name
          params = ip1.params.concat(ip2.params)
        } else {
          method = 'intersect' + ip2.name + ip1.name
          params = ip2.params.concat(ip1.params)
        }
        if (!(method in Intersection))
          throw new Error('Intersection not available: ' + method)
        result = Intersection[method].apply(null, params)
      }
    } else {
      result = new Intersection('No Intersection')
    }
    return result
  }
</script>

<h1>Hello {name}!</h1>
