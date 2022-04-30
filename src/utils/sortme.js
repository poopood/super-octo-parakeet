


const sortMe = (arr,heading, str) => {
    if(heading === "name" && str === "asc"){
        let sortedArr = arr.sort((a,b) => {
            if(a.name.toLowerCase() < b.name.toLowerCase()){
                return -1
            }
            if(a.name.toLowerCase() > b.name.toLowerCase()){
                return 1
            }
            return 0
        })
            return sortedArr;
    }
    if(heading === "name" && str === "desc"){
        let sortedArr = arr.sort((b,a) => {
            if(a.name.toLowerCase() < b.name.toLowerCase()){
                return -1
            }
            if(a.name.toLowerCase() > b.name.toLowerCase()){
                return 1
            }
            return 0
        })
            return sortedArr;
    }
    if(heading === "sku" && str === "asc"){
        arr.sort((a,b) => {
                
            return a.sku - b.sku

            
        })
    }
    if(heading === "sku" && str === "desc"){
        arr.sort((b,a) => {
                
            return a.sku - b.sku

            
        })
    }
    if(heading === "price" && str === "asc"){
        arr.sort((a,b) => {
                
            
            return a.price - b.price

            
        })
    }
    if(heading === "price" && str === "desc"){
        arr.sort((b,a) => {
                
            
            return a.price - b.price

            
        })

    }
    if(heading === "available" && str === "asc"){
        arr.sort((a,b) => {
            
        
            return a.available - b.available
        })
    }
    if(heading === "available" && str === "desc"){
        arr.sort((b,a) => {
            
        
            return a.available - b.available
        })
    }

    

    return arr
}

export default sortMe