import Image from "next/image";

export default function LoginView() {
  return (
    <div className='hidden relative lg:flex h-auto w-1/2 bg-muted items-center justify-center'>
      <Image 
        src={'/login/login-view-1.svg'}
        alt='Login view'
        width={600}
        height={600}
        priority
      />
    </div>
  )
}