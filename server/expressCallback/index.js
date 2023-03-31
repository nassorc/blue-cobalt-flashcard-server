function makeExpressCallback(controller) {
    return async function(req, res) {
        const httpRequest = {
            body: req.body,
            query: req.query,
            params: req.params,
            method: req.method,
            path: req.path,
            headers: {
                'Content-Type': req.get('Content-Type'),
                Referer: req.get('referer')
            }
        }
        try {
            const httpResponse = await controller(httpRequest)
            if(httpResponse.headers) {
                res.set(httpRequest.headers)
            }
            res.type('json')
            res.status(httpResponse.statusCode).send(httpResponse.body)
        }
        catch(err) {
            res.sendStatus(500)
        }
        
    }
}

module.exports = makeExpressCallback
