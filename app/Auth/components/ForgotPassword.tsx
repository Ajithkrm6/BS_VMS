import { Button } from '../../components/ui/button';
import {Card,CardContent,CardFooter,CardHeader,CardTitle} from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';


export function ForgotPassword(){
    return(
        <Card className="w-full max-w-sm border-none shadow-none ring-0">
      <CardHeader>
        <CardTitle className='py-5'>Forgot Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className='text-[#3A3541]' >Business Email</Label>
              <Input
                id="email"
                type="email"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-[#136DEC] p-5" >
              Reset Password
            </Button>
          </div>

          <CardFooter className="flex flex-col md:flex-row gap-2 px-0 mt-6 flex border-none w-full justify-center">
            <p>Back to <span>Login</span> </p>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
    )
}