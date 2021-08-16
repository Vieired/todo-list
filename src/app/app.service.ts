import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Todo } from "src/models/todo.models";
import { tap } from 'rxjs/operators'
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TodoListService {
    private readonly API = `${environment.API}todoList`

    constructor(private http: HttpClient) { }

    list() {
        return this.http.get<Todo[]>(this.API)
            .pipe(
                tap(console.log)
            );
    }
}