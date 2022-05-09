import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  login(): string {
    return 'login function work!'
  }

  logout() : string { 
    return 'logout function work!'
  }

  patch_userinfo() : string {
    return 'Patch_userinfo work!'
  }

  get_userinfo() : string {
    return "get_userinfo work!"
  }

  delete_user() : string {
    return "delete_user work!"
  }
}
