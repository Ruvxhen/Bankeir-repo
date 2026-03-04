//Importar funciones de: Visualizar, texto, hoja de diseño, imagen, ingresar ttexto y ocapacidad
import { useRef, useState } from "react"; //animación y useRef
import { Animated, Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
//----------------------------------------------
//HomeScreen: Pantalla principal
//export default: exportar una entidad principal
//function: ps función
export default function HomeScreen() {
  //el ancho de la pantalla
  const screenWidth = Dimensions.get("window").width;
  //useRef: evita re-renderizados innecesarios
  //.current: recupera el valor de la referencia
  const menuX = useRef(new Animated.Value(240)).current;

  //useState: añade estado a un componente funcional
  const [open, setOpen] = useState(false);

  //P A N T A L L A S   P A R A   L A S   C A T E G O R Í A S (del menú)-----
  const [currentScreen, setCurrentScreen] = useState("Home");

  // Estado para simular datos (luego esto vendrá de una base de datos ---
  const [transactions, setTransactions] = useState([
    { id: 1, titulo: "Compra Tienda", monto: -50, fecha: "06/Ene/2026", categoria: "NU", color: "#b5aed4" },
    { id: 2, titulo: "Transferencia", monto: 200, fecha: "07/Ene/2026", categoria: "BBVA", color: "#a0c4ff" },
  ]);

  //A N I M A C I Ó N --------------------------------------
  const toggleMenu = () => {
    Animated.timing(menuX, {
      toValue: open ? 240 : 0,
      duration: 300,
      useNativeDriver: true, //mejora la fluidez
    }).start();
    setOpen(!open);
  };


  return (
    <View style={styles.container}>
      {/* Banner */}
      <View style={styles.banner}>
        <View style={styles.headerRow}>

          {/* LÓGICA DE REEMPLAZO: Si es Home muestra perfil, si no, el Título de la categoría */}
          <View style={styles.leftRow}>
            {currentScreen === "Home" ? (
              <>
              
                <TouchableOpacity onPress={() => console.log("Ir al login")}>
                  <Image
                    source={{ uri: "https://via.placeholder.com/100" }}
                    style={styles.avatar}
                  />
                </TouchableOpacity>

                <Text style={styles.title}>Bankeir</Text>
              </>
            ) : (
              <Text style={styles.categoryTitle}>{currentScreen}</Text>
            )}
          </View>

          {/* BOTÓN PRINCIPAL (Siempre a la derecha) */}
          <TouchableOpacity onPress={toggleMenu}>
            <Text style={styles.menuText}>☰</Text>
          </TouchableOpacity>
        </View>

        {/* Buscador: Siempre abajo del header, pero arriba del contenido */}
        <TextInput
          placeholder={`  Buscar en ${currentScreen}...`}
          placeholderTextColor="#aaa"
          style={styles.search}
        />
      </View>
      

      {/* 2. Contenido Dinámico */}
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        {currentScreen === "Home" ? (
          <View style={{ padding: 20 }}>
            <Text style={{ color: "white", fontSize: 18 }}>
              Faltan los rectángulitozzz
            </Text>
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Vacío todavía ekisde</Text>
          </View>
        )}
      </View>

      {/* MENÚ ANIMADO */}
      <Animated.View
        style={[
          styles.sideMenu,
          { transform: [{ translateX: menuX }] }
        ]}
      >

        {/* BOTÓN DE CERRAR */}
        <TouchableOpacity style={styles.closeBtn} onPress={toggleMenu}>
          <Text style={styles.closeText}>☰</Text>
        </TouchableOpacity>

        {/* CATEGORÍAS */}
        <TouchableOpacity onPress={() => { setCurrentScreen("Home"); toggleMenu(); }}>
          <Text style={styles.item}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { setCurrentScreen("Metas"); toggleMenu(); }}>
          <Text style={styles.item}>Metas</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { setCurrentScreen("Futuros Gastos"); toggleMenu(); }}>
          <Text style={styles.item}>Futuros Gastos</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { setCurrentScreen("Archivados"); toggleMenu(); }}>
          <Text style={styles.item}>Archivados</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { setCurrentScreen("Papelera"); toggleMenu(); }}>
          <Text style={styles.item}>Papelera</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { setCurrentScreen("Reporte"); toggleMenu(); }}>
          <Text style={styles.item}>Reporte</Text>
        </TouchableOpacity>

      </Animated.View>
    </View>
  );
}

// C O N T E N E D O R   D E   E S T I L O ------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  //Menu lateral
  closeBtn: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },

  closeText: {
    fontSize: 40,
    color: "white",
  },

  sideMenu: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 240,
    height: "100%",
    backgroundColor: "#34363d",
    paddingTop: 60,
    paddingHorizontal: 20,
    elevation: 10,
    zIndex: 100,
  },

  item: {
    fontSize: 18,
    marginBottom: 20,
    color: "#ffffff",
  },

  // B A N N E R -------------------------------
  banner: {
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 16,
    paddingTop: 20, // Ajustado para dar espacio a la barra de estado
    paddingBottom: 16,
  },

  menuText: {
    fontSize: 35,
    color: "white",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  leftRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "#838383",
  },

  title: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },

  // Estilo para el nombre de la categoría cuando reemplaza al logo
  categoryTitle: {
    fontSize: 26,
    color: "white",
    fontWeight: "bold",
    paddingInlineStart: 10,
  },

  search: {
    backgroundColor: "#2e2e2e",
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 40,
    color: "#ffffff",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});