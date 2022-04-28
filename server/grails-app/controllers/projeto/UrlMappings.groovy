package projeto

class UrlMappings {

    static mappings = {
            delete "/api/$controller/$id(.$format)?"(action:"delete")
            get "/api/$controller(.$format)?"(action:"index")
            get "/api/$controller/$id(.$format)?"(action:"show")
            get "/api/$controller/$email(.$format)?"(action:"getUsername")
            post "/api/$controller(.$format)?"(action:"save")
            put "/api/$controller/update/$id(.$format)?"(action:"update")
            patch "/api/$controller/$id(.$format)?"(action:"patch")

            "/api/user/save"(controller: 'user', action:'save')
            "/api/user/update/**"(controller: 'user', action:'update')
            "/"(controller: 'application', action:'index')
            "500"(view: '/error')
            "404"(view: '/notFound')
    }
}
