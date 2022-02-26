import { Router, Request, Response } from 'express';
import shortUrlController from '../controllers/shorturl.controller';
import shortUrlValidator from '../validator/shorturl.validator';
const router = Router();

router.get('/', async (req: Request, res: Response)=>{
    try{
        console.log("I am up");
    }
    catch(err){
        console.log(err);
    }
    res.json("successful");
});
router.post('/shorturl',shortUrlValidator.createShortUrl,shortUrlController.createShortUrl);
router.get('/shorturl',shortUrlValidator.identifierValidationGet,shortUrlController.getShortUrlData);
router.post('/shorturl/click',shortUrlValidator.identifierValidationPost,shortUrlController.clickShortUrl);

export default router;