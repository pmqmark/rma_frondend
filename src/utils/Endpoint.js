// export const baseUrl = 'https://rmaserver-bpfec8h3h5haa5d6.centralindia-01.azurewebsites.net'
// export const baseUrl = 'http://20.244.88.141'
export const baseUrl = 'http://localhost:8800'

//auth
export const login = '/api/auth/login'
export const adminLogin = '/api/auth/admin/login'

// Guest Routes
export const contactRoute = '/api/contact'
export const registerRoute = "/api/register";
export const guestNewsRoute = "/api/news"; // <= + /:id
export const guestEventRoute = "/api/event"; // <= + /:id

// Member Routes
export const Addmember = "/api/admin/member";

// Member Routes
export const memberPublicationRoute = "/api/member/publication";
export const memberNewsletterRoute = "/api/member/newsletter";

// company Routes
export const getAllCompany = "/api/company";
export const CompanyAPI = "/api/admin/company";

// Admin Routes
export const adminNewsRoute = "/api/admin/news";
export const adminEventRoute = "/api/admin/event";
export const adminPublicationRoute = "/api/admin/publication";
export const adminNewsletterRoute = "/api/admin/newsletter";
export const adminApplicationRoute = "/api/admin/application";
export const adminMemberRoute = "/api/admin/member";
export const register = '/api/register'

// events
export const getAllEvents = '/api/event'

// news
export const getAllNews = '/api/news'

// publications
export const getAllPublications = '/api/member/publication'

// newsletter
export const getAllNewsletters = '/api/member/newsletter'

// common image upload route
export const uploadImageUrl = '/api/admin/upload'
export const uploadGustImageUrl = '/api/upload/' 