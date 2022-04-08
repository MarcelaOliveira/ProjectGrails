package projeto

class User {

    String nome
    String email
    String senha
    String endereco
    String telefone

    static constraints = {
        nome maxSize: 255
        email maxSize: 255
        senha maxSize: 10
        endereco maxSize: 100
        telefone maxSize: 14

    }
}
