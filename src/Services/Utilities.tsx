const getBase64 = (file:any)=>{
    return new Promise((resolve,reject)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload=()=>resolve(reader.result);
        reader.onerror = error => reject(error);
    })
}
export {getBase64};