function Profile() {
    return (
        <>
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-sm-3">
                        <h1 class="Nickname">Alex Tymanewich</h1>
                        <p>
                            <img class="clock" src="clock 1.png" /> Приєднався у квітні 2024
                        </p>
                    </div>
                    <div class="col">
                        <img class="user-2" src="user icon.png" />
                    </div>
                </div>
            </div>
            <div class="container main-info">
                <div class="row align-items-center">
                    <div class="col-sm-3">
                        <h3 class="static">Статистика</h3>
                        <div class="block-days">
                            <img class="fire" src="Group.png" alt="Group Icon" />
                            <span class="number">12</span>
                            <p class="description">Кількість днів</p>
                        </div>
                        <div class="liga">
                            <img class="lig-name" src="row_1.png" alt="Group Icon" />
                            <span class="number">Ліга</span>
                            <p class="description">Поточна ліга</p>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="block-points">
                            <img class="mack" src="electric.png" alt="Group Icon" />
                            <span class="number">100</span>
                            <p class="description">Кількість балів</p>
                        </div>
                        <div class="liga">
                            <img class="medal" src="icon.png" alt="Group Icon" />
                            <span class="number"><strong>11</strong></span>
                            <p class="description">Рівень</p>
                        </div>
                    </div>
                    <div class="col-xl">
                        <div class="friend">
                            <img src="/image.png" alt="Your Image"/>
                            <p>Запросіть своїх друзів
                                Розкажи своїм друзям про YUkis</p>
                        </div>
                        <div class="friend-container">
                            <button>Запросити друзів</button>
                        </div>



                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;