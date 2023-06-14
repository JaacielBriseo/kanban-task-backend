import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'signup' })
  async signIn(
    @Args('signupInput') signupInput: SignupInput,
  ): Promise<AuthResponse> {
    return this.authService.signup(signupInput);
  }

  // @Mutation(()=> AuthResponse,{name:'login'})
  // async login(){
  //   return this.authService.login()
  // }

  // @Query(()=>AuthResponse,{name:'revalidate'})
  // async revalidateToken(){
  //   // return this.authService.revalidateToken()
  // }
}