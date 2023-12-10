function CreateTest() {
    return (
        <section class="new-ad container border">
            <div class="row align-items-center">
                <div class="col-md">
                    <h2 class="new-title navbar-brand">Створення нового тесту</h2>

                    <div class="row">
                        <div class="col-md-6">
                            <p>Назва</p>
                            <input type="text" />
                        </div>

                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="my-4 d-flex align-items-center">
                                <div class="dropdown" id="categoryDropdown">
                                    <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown">
                                        Категорія
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li>
                                            <a class="dropdown-item" data-value="Культура">
                                                Культура
                                            </a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" data-value="Мова">
                                                Мова
                                            </a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" data-value="Історія">
                                                Історія
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <p>Опис (не обов'язково)</p>
                            <textarea class="form-control resize-none" rows="4"></textarea>
                        </div>
                    </div>

                    <button class="btn sign-in ml-auto my-3" style={{ color: 'white' }}>
                        Створити
                    </button>
                </div>
            </div>
        </section>

    );
}

export default CreateTest;
