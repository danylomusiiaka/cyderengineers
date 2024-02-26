function Profile() {
    return (
        <>
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-sm-3">
                        <h3 class="Nickname"><strong>Alex Tymanewich</strong></h3>
                        <p>
                            <img class="clock" src="clock 1.png" /> Приєднався у квітні 2024
                        </p>
                        <p class="following">
                            <img class="meeeen" src="meeeeen.png" /> 13 Слідкування / 54
                            Слідкувачі
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
                        <h3 class="static"><strong>Статистика</strong></h3>
                        <div class="block-days">
                            <img class="fire" src="Group.png" alt="Group Icon" />
                            <span class="number"><strong>12</strong></span>
                            <p class="days">Кількість днів</p>
                        </div>
                        <div class="liga">
                            <img class="lig-name" src="row_1.png" alt="Group Icon" />
                            <span class="lig"><strong>Ліга</strong></span>
                            <p class="potic-lig">Поточна ліга</p>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="block-points">
                            <img class="mack" src="electric.png" alt="Group Icon" />
                            <span class="points"><strong>100</strong></span>
                            <p class="avarage-ponits">Кількість балів</p>
                        </div>
                        <div class="liga">
                            <img class="medal" src="icon.png" alt="Group Icon" />
                            <span class="number"><strong>11</strong></span>
                            <p class="level">Рівень</p>
                        </div>
                    </div>
                    <div class="col-xl">
                        <div class="friends-block">
                            <div class="friend-image-container">
                                <img class="friend" src="image.png" alt="Group Icon" />
                            </div>
                            <div class="friend-text">
                                <span class="invite"
                                ><strong>Запросіть своїх друзів</strong></span
                                >
                                <p>Розкажи своїм друзям про YUkis</p>
                                <button class="invite-button">Запросити друзів</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;