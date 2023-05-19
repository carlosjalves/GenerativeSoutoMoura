var WFCTool3D = function(){
  var tiles = []
  
  
  function fit(d,a,b){
    if (d == "x"){
      for (var i = 0; i < a.length; i++){
        for (var j = 0; j < a[i][0].length; j++){
          if (a[i][a[i].length-1][j] != b[i][0][j]){
            return false;
          }
        }
      }
    }else if (d == "y"){
      for (var i = 0; i < a[0].length; i++){
        for (var j = 0; j < a[i][0].length; j++){
          if (a[a.length-1][i][j] != b[0][i][j]){
            return false;
          }
        }
      }
    }else if (d == "z"){
      for (var i = 0; i < a.length; i++){
        for (var j = 0; j < a[0].length; j++){
          if (a[i][j][a[i][0].length-1] != b[i][j][0]){
            return false;
          }
        }
      }      
    }
    return true;
  }
  

/*  this.generateWFCInput = function(){
    var rules = []
    for (var i = 0; i < tiles.length; i++){
      for (var j = 0; j < tiles.length; j++){

        if (fit("x",tiles[i],tiles[j])){
          rules.push(['x',i,j])
        }
        if (fit("y",tiles[i],tiles[j])){
          rules.push(['y',i,j])
        }
        if (fit("z",tiles[i],tiles[j])){
          rules.push(['z',i,j])
        }
      }
    }
    return {weights,rules,nd:3}
  }
}*/
}