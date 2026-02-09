# Implementation Plan: Product Dashboard

## Overview

This implementation plan breaks down the product dashboard feature into discrete coding tasks. The approach follows an incremental development pattern: define types and interfaces first, implement core data fetching and filtering logic, build UI components, add navigation, and finally implement property-based tests to validate correctness properties.

## Tasks

- [ ] 1. Set up project structure and TypeScript interfaces
  - Create directory structure: `src/app/dashboard/products/` and `src/app/dashboard/products/[id]/`
  - Define TypeScript interfaces for Product, ProductsApiResponse, and FilterState in a shared types file
  - Set up test directory structure with `__tests__` folders
  - _Requirements: 6.1, 6.2_

- [ ] 2. Implement API integration and data fetching
  - [ ] 2.1 Create API utility functions for fetching products
    - Implement `fetchProducts()` function to fetch all products from API
    - Implement `fetchProductById(id)` function to fetch single product
    - Add error handling for network failures and HTTP errors
    - _Requirements: 1.1, 4.4, 8.1_
  
  - [ ]* 2.2 Write unit tests for API functions
    - Test successful fetch scenarios
    - Test error handling (network errors, 4xx, 5xx)
    - Mock API responses using MSW
    - _Requirements: 1.1, 4.4, 8.1_

- [ ] 3. Implement filter and search logic
  - [ ] 3.1 Create filter utility function
    - Implement `applyFilters(products, filterState)` function
    - Handle search term filtering (name and description)
    - Handle category filtering
    - Handle subcategory filtering
    - Ensure all filters compose correctly
    - _Requirements: 2.2, 3.3, 3.4, 3.5_
  
  - [ ]* 3.2 Write property test for search filter correctness
    - **Property 4: Search Filter Correctness**
    - **Validates: Requirements 2.2**
  
  - [ ]* 3.3 Write property test for category filter correctness
    - **Property 5: Category Filter Correctness**
    - **Validates: Requirements 3.3**
  
  - [ ]* 3.4 Write property test for subcategory filter correctness
    - **Property 6: SubCategory Filter Correctness**
    - **Validates: Requirements 3.4**
  
  - [ ]* 3.5 Write property test for filter composition
    - **Property 7: Filter Composition Correctness**
    - **Validates: Requirements 3.5**
  
  - [ ]* 3.6 Write property test for filter reset behavior
    - **Property 8: Filter Reset Behavior**
    - **Validates: Requirements 2.4, 3.6**

- [ ] 4. Build SearchBar component
  - [ ] 4.1 Implement SearchBar component
    - Create controlled input component with value and onChange props
    - Add debouncing to prevent excessive re-renders
    - Add clear button when search term is present
    - Add proper ARIA labels for accessibility
    - Style using theme system
    - _Requirements: 2.1, 2.2_
  
  - [ ]* 4.2 Write unit tests for SearchBar
    - Test input value changes
    - Test clear button functionality
    - Test debouncing behavior
    - _Requirements: 2.1_

- [ ] 5. Build FilterControls component
  - [ ] 5.1 Implement FilterControls component
    - Create dropdown selects for category and subcategory
    - Extract unique categories and subcategories from product data
    - Add "All" option to clear filters
    - Implement responsive layout (stacked on mobile, inline on desktop)
    - Style using theme system
    - _Requirements: 3.1, 3.2, 3.3, 3.4_
  
  - [ ]* 5.2 Write unit tests for FilterControls
    - Test dropdown rendering with options
    - Test filter selection changes
    - Test "All" option clears filter
    - _Requirements: 3.1, 3.2_

- [ ] 6. Build ProductCard component
  - [ ] 6.1 Implement ProductCard component
    - Display product image with fallback placeholder
    - Display product name, price, category, and subcategory
    - Display originalPrice with strikethrough if present
    - Add image error handling with placeholder
    - Add hover effects using theme colors
    - Make card clickable for navigation
    - Style using theme system and Tailwind CSS
    - _Requirements: 1.2, 1.3, 8.4_
  
  - [ ]* 6.2 Write property test for complete product display
    - **Property 1: Complete Product Display**
    - **Validates: Requirements 1.2**
  
  - [ ]* 6.3 Write property test for original price strikethrough
    - **Property 2: Original Price Strikethrough Display**
    - **Validates: Requirements 1.3**
  
  - [ ]* 6.4 Write unit tests for ProductCard
    - Test rendering with all fields present
    - Test rendering with null description
    - Test rendering with null originalPrice
    - Test rendering with null imageUrl
    - Test image error handling
    - _Requirements: 1.2, 1.3, 8.4_

- [ ] 7. Build ProductGrid component
  - [ ] 7.1 Implement ProductGrid component
    - Create responsive CSS Grid layout (1 column mobile, 2-4 columns desktop)
    - Map products to ProductCard components
    - Handle empty state when no products
    - Add smooth transitions for layout changes
    - Use theme spacing and breakpoints
    - _Requirements: 1.2, 5.1, 5.2, 8.2_
  
  - [ ]* 7.2 Write unit tests for ProductGrid
    - Test grid renders correct number of cards
    - Test empty state display
    - Test responsive layout at different breakpoints
    - _Requirements: 5.1, 5.2, 8.2_

- [ ] 8. Build ProductListContainer (main list page)
  - [ ] 8.1 Implement ProductListContainer component
    - Set up state management with React hooks (products, filteredProducts, filterState, isLoading, error)
    - Implement useEffect to fetch products on mount
    - Implement filter state handlers (handleSearchChange, handleCategoryChange, handleSubCategoryChange)
    - Apply filters to products whenever filterState changes
    - Display loading state while fetching
    - Display error state if fetch fails
    - Display empty state if no products or no results
    - Compose SearchBar, FilterControls, and ProductGrid components
    - Display product count
    - _Requirements: 1.1, 1.4, 1.5, 1.6, 2.2, 2.3, 2.4, 3.3, 3.4, 3.5, 3.6, 7.1, 7.2, 8.1, 8.2, 8.3_
  
  - [ ]* 8.2 Write property test for product count accuracy
    - **Property 3: Product Count Accuracy**
    - **Validates: Requirements 1.4**
  
  - [ ]* 8.3 Write property test for client-side filter processing
    - **Property 11: Client-Side Filter Processing**
    - **Validates: Requirements 7.2**
  
  - [ ]* 8.4 Write unit tests for ProductListContainer
    - Test initial loading state
    - Test successful data fetch and display
    - Test error state display
    - Test empty state display
    - Test filter state updates
    - Test no results state
    - _Requirements: 1.5, 1.6, 8.1, 8.2, 8.3_

- [ ] 9. Create product list page route
  - [ ] 9.1 Create page.tsx for /dashboard/products
    - Create Next.js page component at `src/app/dashboard/products/page.tsx`
    - Render ProductListContainer component
    - Add page metadata (title, description)
    - Ensure authentication is enforced (should inherit from dashboard layout)
    - _Requirements: 1.1_

- [ ] 10. Checkpoint - Ensure product list page works
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Build ProductDetailView component
  - [ ] 11.1 Implement ProductDetailView component
    - Display large product image with fallback
    - Display all product fields with labels (id, name, description, price, originalPrice, category, subCategory)
    - Format and display timestamps (createdAt, updatedAt)
    - Display price with originalPrice if exists
    - Implement responsive layout
    - Style using theme system
    - _Requirements: 4.2_
  
  - [ ]* 11.2 Write property test for complete detail display
    - **Property 10: Complete Detail Display**
    - **Validates: Requirements 4.2**
  
  - [ ]* 11.3 Write unit tests for ProductDetailView
    - Test all fields are rendered
    - Test timestamp formatting
    - Test originalPrice display
    - Test image fallback
    - _Requirements: 4.2_

- [ ] 12. Build ProductDetailContainer component
  - [ ] 12.1 Implement ProductDetailContainer component
    - Set up state management (product, isLoading, error)
    - Implement useEffect to fetch product by ID from URL params
    - Handle loading state
    - Handle error state (API failure, invalid ID)
    - Implement back button navigation to product list
    - Render ProductDetailView with product data
    - _Requirements: 4.3, 4.4, 8.5_
  
  - [ ]* 12.2 Write unit tests for ProductDetailContainer
    - Test product fetch on mount
    - Test loading state
    - Test error state for invalid ID
    - Test back button navigation
    - _Requirements: 4.3, 4.4, 8.5_

- [ ] 13. Create product detail page route
  - [ ] 13.1 Create page.tsx for /dashboard/products/[id]
    - Create Next.js dynamic route at `src/app/dashboard/products/[id]/page.tsx`
    - Extract product ID from params
    - Render ProductDetailContainer with product ID
    - Add page metadata
    - Ensure authentication is enforced
    - _Requirements: 4.1, 4.4_
  
  - [ ]* 13.2 Write property test for product navigation correctness
    - **Property 9: Product Navigation Correctness**
    - **Validates: Requirements 4.1**

- [ ] 14. Final integration and polish
  - [ ] 14.1 Verify theme integration
    - Ensure all components use theme colors and styling
    - Verify responsive breakpoints match theme configuration
    - Test dark mode if theme supports it
    - _Requirements: 5.3_
  
  - [ ] 14.2 Add navigation link from main dashboard
    - Add link to /dashboard/products from main dashboard page
    - Style link consistently with existing dashboard navigation
    - _Requirements: 1.1_
  
  - [ ]* 14.3 Write integration tests
    - Test full user flow: list → detail → back
    - Test search and filter combinations
    - Test error recovery flows
    - _Requirements: 4.1, 4.3_

- [ ] 15. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples, edge cases, and error conditions
- The implementation follows Next.js 16 App Router conventions
- All components use TypeScript for type safety
- Styling uses Tailwind CSS and the existing theme system
