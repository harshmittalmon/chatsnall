import aj from '../lib/arcjet.js';

export const arcjetProtection = async (req, res, next) => {
    try {
        const decesion = await aj.protect(req);

        if (decesion.isDenied()) {
            if (decesion.reason.isRateLimit()) {
                return res.status(429).json({ message: "Rate limit exceeded. Please try again later" });
            }

            else if (decesion.reason.isBot()) {
                return res.status(403).json({ message: "Bot access denied" });
            }
            else {
                return res.status(403).json({ message: "Acess denied by security reasons" });
            }
        }


        //check for spoofed bots PENDING
        next();
        
    }
    catch (error) {
        console.log("Arcjet Protection Error:", error);
        next();
    }
}