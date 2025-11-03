import { inject } from "@angular/core";
import { CanActivateChildFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const adminGaurd:CanActivateChildFn=(route,state)=>{
    const authSerice=inject(AuthService);
    const router=inject(Router);
    if(authSerice.LoginIn && authSerice.isAdmin){
        return true;
    }else{
        router.navigateByUrl('/login');
        return false;
    }
}
//canActivate:[adminGaurd]