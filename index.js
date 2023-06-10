import { AwsClient, S3 } from 'aws4fetch'
const aws = new AwsClient({
    accessKeyId : ACCESS_KEY_ID,
    secretAccessKey : SECRET_ACCESS_KEY,
    region : REGION_NAME
})
const endpoint = ENDPOINT_URL

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

var [rval, rstatus] = ["default",{status: 200}]
class _S3 {
    constructor(pathname,request){
        
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
                    let data = await request.text()
                    rval= JSON.stringify({'data' : data},{status: 200})
                    break
                default:
                    rval = JSON.stringify({'status':'korong'})
                    break
            } 
            return new Response(rval,rstatus)
        }
        else{
            return new Response(pathname+" is... "+Boolean(pathname.match(/\/s3/i)))
        }
    }
}

