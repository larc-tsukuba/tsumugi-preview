import { calculateConnectedComponents } from "./components.js";

// --------------------------------------------------------
// PNG Exporter
// --------------------------------------------------------

export function exportGraphAsPNG(cy, file_name) {
    const pngContent = cy.png({
        scale: 6.25, // Scale to achieve 600 DPI
        full: true, // Set to true to include the entire graph, even the offscreen parts
    });

    const a = document.createElement("a");
    a.href = pngContent;
    a.download = `${file_name}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// --------------------------------------------------------
// CSV Exporter
// --------------------------------------------------------

export function exportGraphAsCSV(cy, file_name) {
    // calculateConnectedComponentsを利用して連結成分を取得
    const connected_component = calculateConnectedComponents(cy);

    // CSVのヘッダー行
    let csvContent = "module,gene,phenotypes\n";

    // クラスター番号を割り当てて、CSVフォーマットに変換
    connected_component.forEach((component, moduleIndex) => {
        const moduleNumber = moduleIndex + 1;

        Object.keys(component).forEach((gene) => {
            const phenotypes = component[gene].join(";"); // 表現型をセミコロン区切りで結合

            // CSVの各行を生成
            csvContent += `${moduleNumber},${gene},"${phenotypes}"\n`;
        });
    });

    // CSVファイルを生成しダウンロード
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file_name}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
