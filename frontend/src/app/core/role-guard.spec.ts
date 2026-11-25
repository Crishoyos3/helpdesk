import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
  provideRouter,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Role } from './models';
import { roleGuard } from './role-guard';

describe('roleGuard', () => {
  let loggedIn = false;
  let currentRole: Role = 'user';

  const run = (...roles: Role[]) =>
    TestBed.runInInjectionContext(() =>
      roleGuard(...roles)({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
    ) as boolean | UrlTree;

  beforeEach(() => {
    loggedIn = false;
    currentRole = 'user';
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: {
            isLoggedIn: () => loggedIn,
            hasRole: (...roles: Role[]) => roles.includes(currentRole),
          },
        },
      ],
    });
  });

  it('redirects to /login when there is no session', () => {
    const result = run('admin') as UrlTree;
    expect(TestBed.inject(Router).serializeUrl(result)).toBe('/login');
  });

  it('redirects to /tickets when the role is not allowed', () => {
    loggedIn = true;
    currentRole = 'user';
    const result = run('admin') as UrlTree;
    expect(TestBed.inject(Router).serializeUrl(result)).toBe('/tickets');
  });

  it('allows access when the role is allowed', () => {
    loggedIn = true;
    currentRole = 'admin';
    expect(run('admin')).toBe(true);
  });
});