export async function getNFTs(_userwallet) {
  const wallet_address = _userwallet;
  const url = `https://api.utiliti.ai/wallets/${wallet_address}/nfts`;
  const contract_address = "0x88900341f122acce1e6105486ceede3064fd72af";
  const network_id = "80001"; // ethereum
  const query = `?contract_address=${contract_address}&network_id=${network_id}&limit=1`;

  const response = await fetch(url + query, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-API-key": "a126d1e8-1688-44a2-b7f0-2b4e3df26ac2",
    },
  });
  const data = await response.json();
  console.log(data.results);

  return data.results;
}
