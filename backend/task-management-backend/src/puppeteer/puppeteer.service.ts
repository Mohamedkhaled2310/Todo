import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class PuppeteerService {
  async scrapeLinkedInProfile(postUrl: string): Promise<{ imgElement: string | null; nameElement: string | null } | { error: string; details?: string }> {
    if (!postUrl) {
      return { error: "postUrl is required in the request body" };
    }

    try {
      const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
      const page = await browser.newPage();

      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36');

      await page.goto(postUrl, {
        waitUntil: 'networkidle2',
        timeout: 60000,
      });

      await page.waitForSelector('h1', { timeout: 10000 });

      const linkedinInfo = await page.evaluate(() => {
        const imgElement = document.querySelector('[data-ghost-classes="bg-color-entity-ghost-background"]')?.getAttribute('src') || null;
        const nameElement = document.querySelector('[data-tracking-control-name="public_post_feed-actor-name"]')?.textContent?.trim() || null;

        return { imgElement, nameElement };
      });

      await browser.close();
      return linkedinInfo;
    } catch (error) {
      return { error: "Failed to scrape data", details: error.message };
    }
  }
}
