(function () {
  Kinetic.Util._FilterWrapDoubleBuffer = function(filter){
    return function(src,dst,opt) {
      // If no dst imageData is provided: make an imitation
      // blank one, the same size as the src image data
      var isOnlySrc = ! dst;
      if( isOnlySrc ){
        dst = {
          width: src.width,
          height: src.height
        };
        var data = [],
          srcData = src.data,
          l = srcData.length, i;
        for( i=0; i<l; i+=1 ){
          data.push(0);
          dst.data = data;
        }
      }

      filter(src,dst,opt);

      // Copy the dst to the src if this was called the old way
      if( isOnlySrc ){
        var dstData = dst.data;
        for( i=0; i<l; i+=1 ){
          srcData[i] = dstData[i];
        }
      }
    };
  };

  Kinetic.Util._FilterWrapSingleBuffer = function(filter){
    return function(src,dst,opt) {
      // If no dst imageData is provided: use the src imageData
      filter(src,dst||src,opt);
    };
  };

})();