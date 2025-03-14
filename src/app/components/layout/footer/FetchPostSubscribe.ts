
export const FetchPostSubscript = async ({data} :{ data: { inputEmail: string } }) =>{
    try {
       const res =  await fetch(`${process.env.NEXT_PUBLIC_LOCAL}/api/post/subscribe-email`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                emailCustomer: data.inputEmail
            })
        }) 
        return res.status
    } catch (error) {
        return error
    }
  
}