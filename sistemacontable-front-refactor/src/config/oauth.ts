export const oauthProviders = [
  { name: "GitHub", icon: "/social/github.svg", provider: "github" },
  { name: "Google", icon: "/social/google.svg", provider: "google" },
]

export const getOAuthUrl = (provider: string) => 
  `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/oauth2/authorization/${provider}`
