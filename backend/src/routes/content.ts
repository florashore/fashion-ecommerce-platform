/**
 * Content Routes
 * Provides CMS-like content for the frontend
 */

import { Router, Request, Response } from 'express';
import landingContent from '@src/data/landing';

const router = Router();

router.get('/landing', (_req: Request, res: Response) => {
    return res.json({
        success: true,
        data: landingContent,
    });
});

export default router;

