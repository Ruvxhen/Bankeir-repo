// 1. IMPORTACIONES: Traemos las herramientas de React y React Native
// useRef: para animaciones | useState: para datos que cambian
import { useRef, useState } from "react"; 
// Componentes básicos: View (caja), Text (letras), Image (fotos), etc.
import { Animated, Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";


// T I P O S   D E   D A T O S  ---------------------------------------------------------
// Definir cómo debe ser una "Transacción" (tarjeta) para que no semi olvide ningún campo
interface Transaction {
  id: number;      // Un número único
  titulo: string;  // El nombre del gasto/ingreso
  monto: number;   // La cantidad de dinero
  fecha: string;   // Cuándo se hizo
  categoria: string; // Ej: NU, BBVA, Efectivo
  color: string;   // El color de fondo de la tarjeta
}


// HomeScreen: Componente principal de nuestra pantalla ---------------------------------------------------------
export default function HomeScreen() {
  
  // A N C H O   D E   P A N T A L L A ----------------------
  const screenWidth = Dimensions.get("window").width;

  // A N I M A C I Ó N   M E N Ú !!!!! :D  ------------------------------
  // useRef: guarda el valor de la posición del menú (empieza en 240, fuera de pantalla)
  const menuX = useRef(new Animated.Value(240)).current;

  // E S T A D O S   (useState) -------------------------------
  // open: ¿El menú está abierto? (si o no)
  const [open, setOpen] = useState(false);
  
  // currentScreen: Para saber en qué sección estamos (Inicio, Metas, etc.)
  const [currentScreen, setCurrentScreen] = useState("Home");

  // transactions: LISTA DE TARJETICAS. 
  // <Transaction[]> le dice a TS que es una LISTA de objetos tipo Transacción.
  //por ahorita es solo texto, no es funcional:
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, titulo: "Compra Tienda", monto: -50, fecha: "06/Ene/2026", categoria: "NU", color: "#b5aed4" },
    { id: 2, titulo: "Transferencia", monto: 200, fecha: "07/Ene/2026", categoria: "BBVA", color: "#a0c4ff" },
  ]);

  // A N I M A C I Ó N -------------------------------------------
  const toggleMenu = () => {
    Animated.timing(menuX, {
      toValue: open ? 240 : 0, // Si está abierto, muévelo a 240. Si no, a 0.
      duration: 300,           // Qué tan rápido se mueve (milisegundos)
      useNativeDriver: true,   // Hace que la animación vaya fluida
    }).start();
    setOpen(!open);            // Cambia el interruptor (de true a false o viceversa)
  };

  return (
    <View style={styles.container}>
      
      {/* B A N N E R   S U P E R I O R ------------------------ */}
      <View style={styles.banner}>
        <View style={styles.headerRow}>
          
          {/* Lado Izquierdo: Perfil o Nombre de Sección */}
          <View style={styles.leftRow}>
            {currentScreen === "Home" ? (
              <>
                <TouchableOpacity onPress={() => console.log("Login")}>
                  {/* Icono de usuario circular */}
                  <View style={styles.avatarPlaceholder}><Text>👤</Text></View>
                </TouchableOpacity>
                <Text style={styles.title}>Bankeir</Text>
              </>
            ) : (
              <Text style={styles.categoryTitle}>{currentScreen}</Text>
            )}
          </View>

          {/* Botón de Menú (Hamburgesa) */}
          <TouchableOpacity onPress={toggleMenu}>
            <Text style={styles.menuText}>☰</Text>
          </TouchableOpacity>
        </View>

        {/* Buscador: Cambia el texto según la sección */}
        <TextInput 
          placeholder={`  buscar en ${currentScreen}`} 
          placeholderTextColor="#aaa" 
          style={styles.search} 
        />
      </View>

      {/* C O N T E N I D O   P R I N C I P A L ------------------ */}
      {/* ScrollView permite bajar si hay muchas tarjetas! */}
      <ScrollView style={{ flex: 1 }}>
        {currentScreen === "Home" ? (
          <View style={styles.contentPadding}>
            
            {/* 1. Tarjeta de Saldo Total (NO FUNCIONAL POL AHOLITA) */}
            <View style={styles.totalCard}>
              <Text style={styles.totalText}>Total: $150</Text>
            </View>

            {/* 2. Lista de tarjetas */}
            {transactions.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={[styles.transactionCard, { backgroundColor: item.color }]}
                onPress={() => console.log("Editando:", item.titulo)}
              >
                {/* Título: Muestra + o - dependiendo del dinero si es gasto o neh */}
                <Text style={styles.cardTitle}>{item.monto > 0 ? "+ " : "- "} {item.titulo}</Text>
                
                {/* Detalles: Monto y Fecha */}
                <Text style={styles.cardDetails}>Monto: ${Math.abs(item.monto)}</Text>
                <Text style={styles.cardDetails}>Fecha: {item.fecha}</Text>
                
                {/* Banco/Categoría: Texto flotando a la derecha */}
                <Text style={styles.bankTag}>{item.categoria}</Text>
              </TouchableOpacity>
            ))}

          </View>
        ) : (
          /* Mensaje si la pantalla está vachía */
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Vacío todavía ekisde</Text>
          </View>
        )}
      </ScrollView>

      {/* B O T O N E S   F L O T A N T E S (Derecha abajo) ------- */}
      {currentScreen === "Home" && (
        <View style={styles.floatingContainer}>
          {/* Botón agregar tarjeticas (+) */}
          <TouchableOpacity style={styles.fabAdd} onPress={() => console.log("Nuevo")}>
            <Text style={styles.fabText}>+</Text>
          </TouchableOpacity>
          
          {/* Botón de Ajustes */}
          <TouchableOpacity style={styles.fabSettings} onPress={() => console.log("Ajustes")}>
            <Text style={{fontSize: 22}}>⚙️</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* M E N Ú   A N I M A D O --------------------------------- */}
      <Animated.View style={[styles.sideMenu, { transform: [{ translateX: menuX }] }]}>
        <TouchableOpacity style={styles.closeBtn} onPress={toggleMenu}>
          <Text style={styles.closeText}>☰</Text>
        </TouchableOpacity>

        {/* Generamos los botones del menú automáticamente */}
        {["Inicio", "Metas", "Futuros Gastos", "Archivados", "Papelera", "Reporte"].map((seccion) => (
          <TouchableOpacity 
            key={seccion} 
            onPress={() => { setCurrentScreen(seccion === "Inicio" ? "Home" : seccion); toggleMenu(); }}
          >
            <Text style={styles.item}>{seccion}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>

    </View>
  );
}


// E S T I L O S ---------------------------------------------------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  
  // Banner de arriba
  //backgroundColor: color de fondo,  paddingHorizontal: espaciado horizontal, paddingTop: espaciado de arriba, paddingBottom: espaciado de abajo
  banner: { backgroundColor: "#1a1a1a", paddingHorizontal: 16, paddingTop: 20, paddingBottom: 16 },
  //flexDirection: "row" (pone los elementos en fila/horizontal), alignItems: "center" (los alinea al centro verticalmente), justifyContent: "space-between" (empuja un elemento a la izquierda y otro a la derecha, dejando espacio en medio), marginBottom: margen hacia abajo
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 15 },
  leftRow: { flexDirection: "row", alignItems: "center" },
  
  // El circulito del perfil
  avatarPlaceholder: { //imagen de avatar provisional JUASJUAS
    width: 45, height: 45, borderRadius: 23, backgroundColor: "white", 
    marginRight: 10, justifyContent: 'center', alignItems: 'center' 
  },
  
  title: { fontSize: 24, color: "white", fontWeight: "bold" },
  categoryTitle: { fontSize: 26, color: "white", fontWeight: "bold", marginLeft: 10 },
  
  // Caja de búsqueda
  search: { backgroundColor: "#333", borderRadius: 25, paddingHorizontal: 15, height: 40, color: "white" },
  
  contentPadding: { padding: 15 },
  
  // Tarjeta gris del Total
  totalCard: { 
    backgroundColor: "#d1d5db", borderRadius: 40, padding: 20, 
    alignItems: "center", marginBottom: 20, borderWidth: 1 
  },
  totalText: { fontSize: 30, fontWeight: "bold", color: "black" },
  
  // Tarjetas de colores (Transacciones)
  transactionCard: { 
    borderRadius: 35, padding: 20, marginBottom: 15, 
    minHeight: 110, justifyContent: "center" 
  },
  cardTitle: { fontSize: 22, fontWeight: "bold", color: "black" },
  cardDetails: { fontSize: 16, color: "#333", marginLeft: 10 },
  bankTag: { 
    position: "absolute", right: 25, bottom: 20, 
    fontSize: 16, color: "rgba(0,0,0,0.4)", fontWeight: "bold" 
  },

  // Contenedor de los botones + y engranaje
  floatingContainer: { position: "absolute", bottom: 30, right: 20, alignItems: "center" },
  
  fabAdd: { 
    backgroundColor: "white", width: 60, height: 60, borderRadius: 30, 
    justifyContent: "center", alignItems: "center", marginBottom: 15, elevation: 5 
  },
  fabSettings: { 
    backgroundColor: "white", width: 50, height: 50, borderRadius: 25, 
    justifyContent: "center", alignItems: "center", elevation: 5 
  },
  fabText: { fontSize: 35, color: "black" },

  // Estilos del menú lateral
  sideMenu: { 
    position: "absolute", top: 0, right: 0, width: 240, height: "100%", 
    backgroundColor: "#34363d", paddingTop: 60, paddingHorizontal: 20, zIndex: 100 
  },
  item: { fontSize: 18, marginBottom: 25, color: "white" },
  closeBtn: { alignSelf: "flex-end", marginBottom: 10 },
  closeText: { fontSize: 40, color: "white" },
  menuText: { fontSize: 30, color: "white" },

  // Contenedor para cuando no hay nada que mostrar
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center", marginTop: 100 },
  emptyText: { color: "white", fontSize: 22, fontWeight: "bold" },
});