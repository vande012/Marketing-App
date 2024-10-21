import axios from 'axios'
import cheerio from 'cheerio'

export const scrapeWebsite = async (url: string) => {
  try {
    const { data } = await axios.get(url)
    const $ = cheerio.load(data)
    const title = $('title').text()
    const metaDescription = $('meta[name="description"]').attr('content')
    
    return {
      title,
      metaDescription,
      // Add more checks as needed
    }
  } catch (error) {
    console.error('Error scraping website:', error)
    return null
  }
}