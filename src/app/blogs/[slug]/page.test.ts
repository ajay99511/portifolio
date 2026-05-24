import { readFileSync } from 'fs'
import { join } from 'path'

// Read the source file once for all tests
const sourceFile = join(process.cwd(), 'src', 'app', 'blogs', '[slug]', 'page.tsx')
const source = readFileSync(sourceFile, 'utf-8')

describe('Blog detail page — responsiveness (Requirements 10.5, 10.6)', () => {
  it('"Back to Archive" link has min-h-[44px] class', () => {
    // Requirement 10.6: back-navigation link must have a minimum tap target height of 44px
    expect(source).toMatch(/Back to Archive/)
    // The link element containing "Back to Archive" should have min-h-[44px] in its className
    const backLinkMatch = source.match(/className="[^"]*min-h-\[44px\][^"]*"[\s\S]*?Back to Archive/)
    expect(backLinkMatch).not.toBeNull()
  })

  it('related posts grid has grid-cols-1 class (single column on mobile)', () => {
    // Requirement 10.5: related posts section displays as single column below md breakpoint
    expect(source).toMatch(/grid-cols-1/)
    // The grid should also have responsive columns for larger screens
    expect(source).toMatch(/grid-cols-1 md:grid-cols-2/)
  })
})
