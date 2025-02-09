import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class PuppeteerService {
  async scrapeLinkedInProfile(linkedinUrl: string) {
    const browser = await puppeteer.launch({
      headless: false, 
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-blink-features=AutomationControlled',
      ],
    });

    const page = await browser.newPage();

    // for virtual login
    try {
      await page.setCookie({
        name: 'li_at',
        value: '',
        domain: '.linkedin.com',
        httpOnly: true,
        secure: true,
      });

     
      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, مثل Gecko) Chrome/91.0.4472.124 Safari/537.36'
      );

      await page.setViewport({ width: 1280, height: 800 });

      console.log('Navigating to LinkedIn profile:', linkedinUrl);
      await page.goto(linkedinUrl, { waitUntil: 'networkidle2' });

      
      const cookies = await page.cookies();
      if (!cookies.some(cookie => cookie.name === 'li_at')) {
        throw new Error('Puppeteer is not logged in. LinkedIn requires authentication.');
      }


      await page.evaluate(() => { window.scrollBy(0, window.innerHeight); });

      await page.waitForSelector('.text-heading-xlarge', { timeout: 15000 });

      const name = await page.$eval('.text-heading-xlarge', el => el.textContent?.trim() || '');

   
      const headline = await page.$eval('.text-body-medium.break-words', el => el.textContent?.trim() || '');

 
      let photo: string | null = null;
      try {
        photo = await page.$eval('.pv-top-card-profile-picture__image', el => el.getAttribute('src') || null);
      } catch (imageError) {
        console.warn('Profile image not found, using default image.');
      }

      await browser.close();
      return { name, headline, photo };
    } catch (error) {
      console.error('Error scraping LinkedIn profile:', error);
      await browser.close();
      throw new Error('Failed to scrape LinkedIn profile. LinkedIn might require login.');
    }
  }
}
