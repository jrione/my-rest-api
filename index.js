addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})


var [rval, rstatus] = ["",{status: 200}]
class _S3 {
    constructor(pathname,request){
        let s3path="/s3"
        switch(pathname){
            case s3path:
            case s3path+"/":
                rval = JSON.stringify({'status':BUCKET_NAME+"KORONGG"})
                rstatus= {status: 200}
                break
            case s3path+"/upload":
                if(request.method != "POST"){
                    return new _status({'status': request.method}, 405)
                }
                const data = request.text()
                rval = JSON.stringify({'status':data})
                break
            default:
                rval = JSON.stringify({'status':'korong'})
                break
        } 
        return new Response(rval,rstatus)
    }
}

class _status {
    constructor(explain,code){
        rstatus = {status: code}
        return new Response(JSON.stringify(explain),rstatus)
    }
}

async function handleRequest(request) {
    const { protocol, pathname } = new URL(request.url)

    if ( "https:" !== protocol || "https" !== request.headers.get("x-forwarded-proto")) {
        throw new BadRequestException("Please use a HTTPS connection.");
    }

    if (pathname !== pathname.toLowerCase()) {
        return new _status({'status':'Not found'},404)
    }
    else{
        if(pathname.match(/\/s3/i)){
            return new _S3(pathname,request)
        }
        else{
            return new Response(pathname+" is... "+Boolean(pathname.match(/\/s3/i)))
        }
    }
}

