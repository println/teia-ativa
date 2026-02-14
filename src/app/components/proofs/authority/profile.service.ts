import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { Profile } from './profile.model';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private profiles = ['profile_suzan.json', 'profile_roberto.json', 'profile_sabrina.json'];
    private baseUrl = 'assets/profiles/';

    constructor(private http: HttpClient) { }

    getProfiles(): Observable<Profile[]> {
        const profilesToLoad = ['profile_suzan.json', 'profile_roberto.json', 'profile_sabrina.json'];
        const requests = profilesToLoad.map(file =>
            this.http.get<Profile>(`assets/profiles/${file}`)
        );
        return forkJoin(requests);
    }
}
