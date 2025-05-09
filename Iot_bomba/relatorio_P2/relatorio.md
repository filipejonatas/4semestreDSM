Relatório do Sistema de Detecção de Movimento "Bomba"
1. Objetivo
Desenvolver um circuito capaz de:
Detectar movimento usando um mini sensor PIR HC-SR505.
Exibir mensagens e contagem regressiva num display LCD I2C (16×2).
Registrar eventos de acionamento ('bomba acionada' e 'BOOM!') em um banco de dados PostgreSQL, via um servidor Node.js/Express.
2. Materiais Utilizados
Componente	Quantidade	Observações
ESP32 Dev Kit	1	Alimentação 3.3 V / VIN ≈ 5 V
Sensor PIR HC-SR505	1	Pino OUT digital
Módulo LCD I2C 16×2	1	Endereço I²C padrão 0x27
Jumpers	Vários	Conexões entre componentes
Cabo USB	1	Para alimentação/programação
PostgreSQL	1 instância	Banco de dados local (porta 5432)
Node.js + Express + pg	-	Backend de registro de eventos
 
3. Montagem Elétrica
LCD I2C ↔ ESP32:
VCC → VIN
GND → GND
SDA → D21
SCL → D22
PIR HC-SR505 ↔ ESP32:
VCC → 3.3 V
GND → GND
OUT → D32
4. Código Embarcado (ESP32)
O código controla a detecção de movimento e aciona o LCD I2C para exibir mensagens.
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
 
#define PIR_PIN 32
LiquidCrystal_I2C lcd(0x27, 16, 2);
int lastState = LOW;
 
void setup() {
  Serial.begin(115200);
  lcd.init();
  lcd.backlight();
  pinMode(PIR_PIN, INPUT);
  lcd.setCursor(0, 0);
  lcd.print("Calibrando...");
  delay(5000);
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Sem movimento");
}
 
void loop() {
  int motionState = digitalRead(PIR_PIN);
  if (motionState == HIGH && lastState == LOW) {
    Serial.println("Movimento detectado!");
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Bomba acionada");
    for (int i = 5; i > 0; i--) {
      lcd.setCursor(0, 1);
      lcd.print("Explode em: ");
      lcd.print(i);
      delay(1000);
    }
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("BOOM!");
    Serial.println("BOOM!");
    delay(3000);
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Sem movimento");
  }
  lastState = motionState;
  delay(200);
}
5. Backend e Banco de Dados
O servidor Express registra os eventos acionados pela "bomba" no banco de dados PostgreSQL.
Estrutura da tabela:
CREATE TABLE IF NOT EXISTS evento_bomba (
  id SERIAL PRIMARY KEY,
  status VARCHAR(50) NOT NULL,
  data_acao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
6. Testes Realizados
Testes realizados:
Verificação da detecção de movimento pelo sensor PIR.
Visualização da mensagem no LCD.
Registro correto no banco de dados através da API.
7. Conclusão
O circuito apresentou bom desempenho, detectando movimentos corretamente e exibindo as mensagens no LCD. Os registros de acionamento foram armazenados no banco de dados conforme esperado.
Próximos passos incluem:
Melhorar a captura do sensor de movimento.
Adicionar um alarme para alertas sonoros.