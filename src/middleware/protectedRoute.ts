import { Request, Response, NextFunction } from "express";
import { IAPISecrets } from "../interfaces";

/**
 * Middleware that guards a route with a shared API key.
 * The caller must send the key in the `x-api-key` header.
 * Store the expected key in app secrets as `api_key`.
 *
 * Usage: app.use("/api/admin", protectedRoute(), adminRouter);
 */
const protectedRoute = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const secrets = req.app.get("secrets") as IAPISecrets | undefined;
    if (!secrets) {
      return res.status(500).json({ error: "Secrets not loaded" });
    }

    const provided = req.headers["x-api-key"];
    // TODO: replace with bcrypt compare if you store a hash instead of plaintext
    const expected = (secrets as any).api_key as string | undefined;

    if (!provided || provided !== expected) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    next();
  };
};

export default protectedRoute;
