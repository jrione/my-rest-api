addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

var [rval, rstatus] = ["",{status: 200}]
const { protocol, pathname } = new URL(request.url);

class _S3 {
    constructor(){
        switch(pathname){
            case path['s3']+"/":
                karakter = "KORONG"
                rval = JSON.stringify({'status':karakter})

            case "/upload":
                karakter = "suplod"
                rval = JSON.stringify({'status':karakter})

        }
        return new Response(rval,rstatus)  
    }
}

async function handleRequest(request) {
    // if ( "https:" !== protocol || "https" !== request.headers.get("x-forwarded-proto")) {
    //     throw new BadRequestException("Please use a HTTPS connection.");
    // }

    let path = {
        s3: '/s3'
    }

    function _S3(){

        new Response(Boolean(pathname == path['s3']))
    }

    if(pathname === path['s3']){
        return new _S3()
    }
    else{
        return new Response(Boolean(pathname == path['s3']))
    }

}