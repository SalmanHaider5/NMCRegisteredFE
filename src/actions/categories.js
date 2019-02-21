export const postCategory = formData => dispatch => {
    const { title, img } = formData
    //console.log(img)
    const form = new FormData();
    form.append('name', title)
    form.append('img', img)
    // dispatch({type: 'Test'})
    fetch('http://localhost:1000/categories', {
        method: 'POST',
        // headers: { 'Content-Type':'multipart/form-data' },
        body: form
    }).then((res) => res.json())
    .then((data) =>  {
        console.log(data)
        dispatch({type: 'SUCCESS'})
    })
    .catch((err) => {
        console.log(err) 
        dispatch({type: 'ERROR'})
    })
}