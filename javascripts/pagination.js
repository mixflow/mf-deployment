 
export function initPagination() {
    // Keep track of loaded pages
    // This is to prevent the browser from making duplicate requests for the same page
    // page num should be dynamic, page number from path "articles_content/page/{page_number}.html"  
    const startPageMatch = window.location.pathname.match(/page\/(\d+)/)
    const startPageNum = startPageMatch ? parseInt(startPageMatch[1]) : 1
    const loadedPages = new Set([startPageNum]) // Start with page 1 loaded

    console.log('Start page number:', startPageNum)
    console.log('Loaded pages:', loadedPages)

    document.addEventListener('click', async (event) => {
        const link = event.target.closest('[data-pagination]')
        if (!link) return

        event.preventDefault()
        const turboAction = link.dataset.turboAction || 'replace';
        // the actual content link which is the parital page without layout normally
        const partialUrl = link.dataset.partialUrl;
        const turboTarget = link.dataset.turboTarget;

        console.log('Partial URL:', partialUrl)

            // Extract page number from URL (adjust regex based on your URL pattern)
        const pageMatch = partialUrl.match(/page\/(\d+)/)
        const pageNum = pageMatch ? parseInt(pageMatch[1]) : 1

        console.log('Page number:', pageNum)
        // Skip if page already loaded
        if (pageNum && loadedPages.has(pageNum)) {
            console.log('Page already loaded:', pageNum);
            return;
        }

        try {
            const response = await fetch(partialUrl)
            const html = await response.text()
            // console.log('Received HTML:', html)
            
            const streamHTML = `
            <turbo-stream action="${turboAction}" target="${turboTarget}">
                <template>${html}</template>
            </turbo-stream>
            `
            // console.log('Stream HTML:', streamHTML)
            Turbo.renderStreamMessage(streamHTML)
        } catch (error) {
            console.error('Pagination error:', error)
            // On error, fall back to default navigation
            window.location.href = link.href
        }

        // Mark page as loaded
        if (pageNum) loadedPages.add(pageNum)
    })
}
