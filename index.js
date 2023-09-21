import { AwsClient} from 'aws4fetch'

const aws = new AwsClient({
    accessKeyId : ACCESS_KEY_ID,
    secretAccessKey : SECRET_ACCESS_KEY,
    region : REGION_NAME,
})

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

class _status {
    constructor(explain,code){
        rstatus = {status: code}
        return new Response(JSON.stringify(explain),rstatus)
    }
}

async function handleRequest(request) {
    var [rval, rstatus] = ["default",{status: 200}]
    const { protocol, pathname } = new URL(request.url)

    if ( "https:" !== protocol || "https" !== request.headers.get("x-forwarded-proto")) {
        throw new BadRequestException("Please use a HTTPS connection.");
    }
    if (pathname !== pathname.toLowerCase()) {
        return new _status({'status':'Not found'},404)
    }
    else{
        let svcpath="/"
        if(pathname.match(/\/s3/i)){
            svcpath="/s3"
            switch(pathname){
                case svcpath:
                case svcpath+"/":
                    rval = JSON.stringify({'status':BUCKET_NAME+"AWIKWOK"})
                    rstatus= {status: 200}
                    break
                case svcpath+"/upload":
                    if(request.method != "POST"){
                        return new _status({'status': request.method}, 405)
                    }
                    const formData = await request.formData();
                    const file = formData.get('file');
                    const res = await aws.fetch(ENDPOINT_URL+file.name.toString(),{
                        method: 'PUT',
                        body: "NGORONG"
                    })
                    rval = JSON.stringify({'status':file})
                    break
                default:
                    rval = JSON.stringify({'status':'korong'})
                    break
            } 
            return new Response(rval,rstatus)
        }
        // future project
        else if(pathname.match(/\/websocket/i)){
            svcpath="/websocket"
            return new Response(pathname)
        }
        else{
            return new Response(pathname+" is... "+Boolean(pathname.match(/\/s3/i)))
        }
    }
}
