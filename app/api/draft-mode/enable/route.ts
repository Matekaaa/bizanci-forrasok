import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const redirectUrl = searchParams.get('redirect') || '/'
  
  const draft = await draftMode()
  draft.enable()
  
  redirect(redirectUrl)
}