
export const FetchPostSubscript = async ({data} :{ data: { inputEmail: string } }) =>{
   await fetch(`${process.env.NEXT_PUBLIC_LOCAL}/post/api/subscribe-email`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            emailCustomer: data.inputEmail
        })
    }) 
}