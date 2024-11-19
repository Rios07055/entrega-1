import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../auth/services/user.service';

export const loginGuard: CanActivateFn = async (route, state) => {

  const userService = inject(UserService);

  return await userService.validateUser();
};
