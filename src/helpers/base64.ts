export const base64 = (file: File | null) => {
    if(file){
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    } else {
        throw new Error('no file set')
    }

}