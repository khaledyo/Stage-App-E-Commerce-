import { inject } from "@angular/core";
import { CanActivateChildFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const authGaurd:CanActivateChildFn=(route,state)=>{
    const authSerice=inject(AuthService);
    const router=inject(Router);
    if(authSerice.LoginIn ){
        return true;
    }else{
        router.navigateByUrl('/login');
        return false;
    }
}
//canActivate:[authGaurd]