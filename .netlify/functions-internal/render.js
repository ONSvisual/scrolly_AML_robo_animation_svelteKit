const { init } = require('../handler.js');

exports.handler = init({
	appDir: "_app",
	assets: new Set(["data/.DS_Store","data/.~lock.data_district.csv#","data/data_district.csv","data/data_region.csv","data/geo_lad2021.json","data/neighbours.js","data/place_data/E06000001.json","data/place_data/E06000002.json","data/place_data/E06000003.json","data/place_data/E06000004.json","data/place_data/E06000005.json","data/place_data/E06000006.json","data/place_data/E06000007.json","data/place_data/E06000008.json","data/place_data/E06000009.json","data/place_data/E06000010.json","data/place_data/E06000011.json","data/place_data/E06000012.json","data/place_data/E06000013.json","data/place_data/E06000014.json","data/place_data/E06000015.json","data/place_data/E06000016.json","data/place_data/E06000017.json","data/place_data/E06000018.json","data/place_data/E06000019.json","data/place_data/E06000020.json","data/place_data/E06000021.json","data/place_data/E06000022.json","data/place_data/E06000023.json","data/place_data/E06000024.json","data/place_data/E06000025.json","data/place_data/E06000026.json","data/place_data/E06000027.json","data/place_data/E06000030.json","data/place_data/E06000031.json","data/place_data/E06000032.json","data/place_data/E06000033.json","data/place_data/E06000034.json","data/place_data/E06000035.json","data/place_data/E06000036.json","data/place_data/E06000037.json","data/place_data/E06000038.json","data/place_data/E06000039.json","data/place_data/E06000040.json","data/place_data/E06000041.json","data/place_data/E06000042.json","data/place_data/E06000043.json","data/place_data/E06000044.json","data/place_data/E06000045.json","data/place_data/E06000046.json","data/place_data/E06000047.json","data/place_data/E06000049.json","data/place_data/E06000050.json","data/place_data/E06000051.json","data/place_data/E06000052.json","data/place_data/E06000053.json","data/place_data/E06000054.json","data/place_data/E06000055.json","data/place_data/E06000056.json","data/place_data/E06000057.json","data/place_data/E06000058.json","data/place_data/E06000059.json","data/place_data/E06000060.json","data/place_data/E06000061.json","data/place_data/E06000062.json","data/place_data/E07000008.json","data/place_data/E07000009.json","data/place_data/E07000010.json","data/place_data/E07000011.json","data/place_data/E07000012.json","data/place_data/E07000026.json","data/place_data/E07000027.json","data/place_data/E07000028.json","data/place_data/E07000029.json","data/place_data/E07000030.json","data/place_data/E07000031.json","data/place_data/E07000032.json","data/place_data/E07000033.json","data/place_data/E07000034.json","data/place_data/E07000035.json","data/place_data/E07000036.json","data/place_data/E07000037.json","data/place_data/E07000038.json","data/place_data/E07000039.json","data/place_data/E07000040.json","data/place_data/E07000041.json","data/place_data/E07000042.json","data/place_data/E07000043.json","data/place_data/E07000044.json","data/place_data/E07000045.json","data/place_data/E07000046.json","data/place_data/E07000047.json","data/place_data/E07000061.json","data/place_data/E07000062.json","data/place_data/E07000063.json","data/place_data/E07000064.json","data/place_data/E07000065.json","data/place_data/E07000066.json","data/place_data/E07000067.json","data/place_data/E07000068.json","data/place_data/E07000069.json","data/place_data/E07000070.json","data/place_data/E07000071.json","data/place_data/E07000072.json","data/place_data/E07000073.json","data/place_data/E07000074.json","data/place_data/E07000075.json","data/place_data/E07000076.json","data/place_data/E07000077.json","data/place_data/E07000078.json","data/place_data/E07000079.json","data/place_data/E07000080.json","data/place_data/E07000081.json","data/place_data/E07000082.json","data/place_data/E07000083.json","data/place_data/E07000084.json","data/place_data/E07000085.json","data/place_data/E07000086.json","data/place_data/E07000087.json","data/place_data/E07000088.json","data/place_data/E07000089.json","data/place_data/E07000090.json","data/place_data/E07000091.json","data/place_data/E07000092.json","data/place_data/E07000093.json","data/place_data/E07000094.json","data/place_data/E07000095.json","data/place_data/E07000096.json","data/place_data/E07000098.json","data/place_data/E07000099.json","data/place_data/E07000102.json","data/place_data/E07000103.json","data/place_data/E07000105.json","data/place_data/E07000106.json","data/place_data/E07000107.json","data/place_data/E07000108.json","data/place_data/E07000109.json","data/place_data/E07000110.json","data/place_data/E07000111.json","data/place_data/E07000112.json","data/place_data/E07000113.json","data/place_data/E07000114.json","data/place_data/E07000115.json","data/place_data/E07000116.json","data/place_data/E07000117.json","data/place_data/E07000118.json","data/place_data/E07000119.json","data/place_data/E07000120.json","data/place_data/E07000121.json","data/place_data/E07000122.json","data/place_data/E07000123.json","data/place_data/E07000124.json","data/place_data/E07000125.json","data/place_data/E07000126.json","data/place_data/E07000127.json","data/place_data/E07000128.json","data/place_data/E07000129.json","data/place_data/E07000130.json","data/place_data/E07000131.json","data/place_data/E07000132.json","data/place_data/E07000133.json","data/place_data/E07000134.json","data/place_data/E07000135.json","data/place_data/E07000136.json","data/place_data/E07000137.json","data/place_data/E07000138.json","data/place_data/E07000139.json","data/place_data/E07000140.json","data/place_data/E07000141.json","data/place_data/E07000142.json","data/place_data/E07000143.json","data/place_data/E07000144.json","data/place_data/E07000145.json","data/place_data/E07000146.json","data/place_data/E07000147.json","data/place_data/E07000148.json","data/place_data/E07000149.json","data/place_data/E07000163.json","data/place_data/E07000164.json","data/place_data/E07000165.json","data/place_data/E07000166.json","data/place_data/E07000167.json","data/place_data/E07000168.json","data/place_data/E07000169.json","data/place_data/E07000170.json","data/place_data/E07000171.json","data/place_data/E07000172.json","data/place_data/E07000173.json","data/place_data/E07000174.json","data/place_data/E07000175.json","data/place_data/E07000176.json","data/place_data/E07000177.json","data/place_data/E07000178.json","data/place_data/E07000179.json","data/place_data/E07000180.json","data/place_data/E07000181.json","data/place_data/E07000187.json","data/place_data/E07000188.json","data/place_data/E07000189.json","data/place_data/E07000192.json","data/place_data/E07000193.json","data/place_data/E07000194.json","data/place_data/E07000195.json","data/place_data/E07000196.json","data/place_data/E07000197.json","data/place_data/E07000198.json","data/place_data/E07000199.json","data/place_data/E07000200.json","data/place_data/E07000202.json","data/place_data/E07000203.json","data/place_data/E07000207.json","data/place_data/E07000208.json","data/place_data/E07000209.json","data/place_data/E07000210.json","data/place_data/E07000211.json","data/place_data/E07000212.json","data/place_data/E07000213.json","data/place_data/E07000214.json","data/place_data/E07000215.json","data/place_data/E07000216.json","data/place_data/E07000217.json","data/place_data/E07000218.json","data/place_data/E07000219.json","data/place_data/E07000220.json","data/place_data/E07000221.json","data/place_data/E07000222.json","data/place_data/E07000223.json","data/place_data/E07000224.json","data/place_data/E07000225.json","data/place_data/E07000226.json","data/place_data/E07000227.json","data/place_data/E07000228.json","data/place_data/E07000229.json","data/place_data/E07000234.json","data/place_data/E07000235.json","data/place_data/E07000236.json","data/place_data/E07000237.json","data/place_data/E07000238.json","data/place_data/E07000239.json","data/place_data/E07000240.json","data/place_data/E07000241.json","data/place_data/E07000242.json","data/place_data/E07000243.json","data/place_data/E07000244.json","data/place_data/E07000245.json","data/place_data/E07000246.json","data/place_data/E08000001.json","data/place_data/E08000002.json","data/place_data/E08000003.json","data/place_data/E08000004.json","data/place_data/E08000005.json","data/place_data/E08000006.json","data/place_data/E08000007.json","data/place_data/E08000008.json","data/place_data/E08000009.json","data/place_data/E08000010.json","data/place_data/E08000011.json","data/place_data/E08000012.json","data/place_data/E08000013.json","data/place_data/E08000014.json","data/place_data/E08000015.json","data/place_data/E08000016.json","data/place_data/E08000017.json","data/place_data/E08000018.json","data/place_data/E08000019.json","data/place_data/E08000021.json","data/place_data/E08000022.json","data/place_data/E08000023.json","data/place_data/E08000024.json","data/place_data/E08000025.json","data/place_data/E08000026.json","data/place_data/E08000027.json","data/place_data/E08000028.json","data/place_data/E08000029.json","data/place_data/E08000030.json","data/place_data/E08000031.json","data/place_data/E08000032.json","data/place_data/E08000033.json","data/place_data/E08000034.json","data/place_data/E08000035.json","data/place_data/E08000036.json","data/place_data/E08000037.json","data/place_data/E09000001.json","data/place_data/E09000002.json","data/place_data/E09000003.json","data/place_data/E09000004.json","data/place_data/E09000005.json","data/place_data/E09000006.json","data/place_data/E09000007.json","data/place_data/E09000008.json","data/place_data/E09000009.json","data/place_data/E09000010.json","data/place_data/E09000011.json","data/place_data/E09000012.json","data/place_data/E09000013.json","data/place_data/E09000014.json","data/place_data/E09000015.json","data/place_data/E09000016.json","data/place_data/E09000017.json","data/place_data/E09000018.json","data/place_data/E09000019.json","data/place_data/E09000020.json","data/place_data/E09000021.json","data/place_data/E09000022.json","data/place_data/E09000023.json","data/place_data/E09000024.json","data/place_data/E09000025.json","data/place_data/E09000026.json","data/place_data/E09000027.json","data/place_data/E09000028.json","data/place_data/E09000029.json","data/place_data/E09000030.json","data/place_data/E09000031.json","data/place_data/E09000032.json","data/place_data/E09000033.json","data/place_data/W06000001.json","data/place_data/W06000002.json","data/place_data/W06000003.json","data/place_data/W06000004.json","data/place_data/W06000005.json","data/place_data/W06000006.json","data/place_data/W06000008.json","data/place_data/W06000009.json","data/place_data/W06000010.json","data/place_data/W06000011.json","data/place_data/W06000012.json","data/place_data/W06000013.json","data/place_data/W06000014.json","data/place_data/W06000015.json","data/place_data/W06000016.json","data/place_data/W06000018.json","data/place_data/W06000019.json","data/place_data/W06000020.json","data/place_data/W06000021.json","data/place_data/W06000022.json","data/place_data/W06000023.json","data/place_data/W06000024.json","data/place_data_less_old/E06000001.json","data/place_data_less_old/E06000002.json","data/place_data_less_old/E06000003.json","data/place_data_less_old/E06000004.json","data/place_data_less_old/E06000005.json","data/place_data_less_old/E06000006.json","data/place_data_less_old/E06000007.json","data/place_data_less_old/E06000008.json","data/place_data_less_old/E06000009.json","data/place_data_less_old/E06000010.json","data/place_data_less_old/E06000011.json","data/place_data_less_old/E06000012.json","data/place_data_less_old/E06000013.json","data/place_data_less_old/E06000014.json","data/place_data_less_old/E06000015.json","data/place_data_less_old/E06000016.json","data/place_data_less_old/E06000017.json","data/place_data_less_old/E06000018.json","data/place_data_less_old/E06000019.json","data/place_data_less_old/E06000020.json","data/place_data_less_old/E06000021.json","data/place_data_less_old/E06000022.json","data/place_data_less_old/E06000023.json","data/place_data_less_old/E06000024.json","data/place_data_less_old/E06000025.json","data/place_data_less_old/E06000026.json","data/place_data_less_old/E06000027.json","data/place_data_less_old/E06000030.json","data/place_data_less_old/E06000031.json","data/place_data_less_old/E06000032.json","data/place_data_less_old/E06000033.json","data/place_data_less_old/E06000034.json","data/place_data_less_old/E06000035.json","data/place_data_less_old/E06000036.json","data/place_data_less_old/E06000037.json","data/place_data_less_old/E06000038.json","data/place_data_less_old/E06000039.json","data/place_data_less_old/E06000040.json","data/place_data_less_old/E06000041.json","data/place_data_less_old/E06000042.json","data/place_data_less_old/E06000043.json","data/place_data_less_old/E06000044.json","data/place_data_less_old/E06000045.json","data/place_data_less_old/E06000046.json","data/place_data_less_old/E06000047.json","data/place_data_less_old/E06000049.json","data/place_data_less_old/E06000050.json","data/place_data_less_old/E06000051.json","data/place_data_less_old/E06000052.json","data/place_data_less_old/E06000053.json","data/place_data_less_old/E06000054.json","data/place_data_less_old/E06000055.json","data/place_data_less_old/E06000056.json","data/place_data_less_old/E06000057.json","data/place_data_less_old/E06000058.json","data/place_data_less_old/E06000059.json","data/place_data_less_old/E06000060.json","data/place_data_less_old/E06000061.json","data/place_data_less_old/E06000062.json","data/place_data_less_old/E07000008.json","data/place_data_less_old/E07000009.json","data/place_data_less_old/E07000010.json","data/place_data_less_old/E07000011.json","data/place_data_less_old/E07000012.json","data/place_data_less_old/E07000026.json","data/place_data_less_old/E07000027.json","data/place_data_less_old/E07000028.json","data/place_data_less_old/E07000029.json","data/place_data_less_old/E07000030.json","data/place_data_less_old/E07000031.json","data/place_data_less_old/E07000032.json","data/place_data_less_old/E07000033.json","data/place_data_less_old/E07000034.json","data/place_data_less_old/E07000035.json","data/place_data_less_old/E07000036.json","data/place_data_less_old/E07000037.json","data/place_data_less_old/E07000038.json","data/place_data_less_old/E07000039.json","data/place_data_less_old/E07000040.json","data/place_data_less_old/E07000041.json","data/place_data_less_old/E07000042.json","data/place_data_less_old/E07000043.json","data/place_data_less_old/E07000044.json","data/place_data_less_old/E07000045.json","data/place_data_less_old/E07000046.json","data/place_data_less_old/E07000047.json","data/place_data_less_old/E07000061.json","data/place_data_less_old/E07000062.json","data/place_data_less_old/E07000063.json","data/place_data_less_old/E07000064.json","data/place_data_less_old/E07000065.json","data/place_data_less_old/E07000066.json","data/place_data_less_old/E07000067.json","data/place_data_less_old/E07000068.json","data/place_data_less_old/E07000069.json","data/place_data_less_old/E07000070.json","data/place_data_less_old/E07000071.json","data/place_data_less_old/E07000072.json","data/place_data_less_old/E07000073.json","data/place_data_less_old/E07000074.json","data/place_data_less_old/E07000075.json","data/place_data_less_old/E07000076.json","data/place_data_less_old/E07000077.json","data/place_data_less_old/E07000078.json","data/place_data_less_old/E07000079.json","data/place_data_less_old/E07000080.json","data/place_data_less_old/E07000081.json","data/place_data_less_old/E07000082.json","data/place_data_less_old/E07000083.json","data/place_data_less_old/E07000084.json","data/place_data_less_old/E07000085.json","data/place_data_less_old/E07000086.json","data/place_data_less_old/E07000087.json","data/place_data_less_old/E07000088.json","data/place_data_less_old/E07000089.json","data/place_data_less_old/E07000090.json","data/place_data_less_old/E07000091.json","data/place_data_less_old/E07000092.json","data/place_data_less_old/E07000093.json","data/place_data_less_old/E07000094.json","data/place_data_less_old/E07000095.json","data/place_data_less_old/E07000096.json","data/place_data_less_old/E07000098.json","data/place_data_less_old/E07000099.json","data/place_data_less_old/E07000102.json","data/place_data_less_old/E07000103.json","data/place_data_less_old/E07000105.json","data/place_data_less_old/E07000106.json","data/place_data_less_old/E07000107.json","data/place_data_less_old/E07000108.json","data/place_data_less_old/E07000109.json","data/place_data_less_old/E07000110.json","data/place_data_less_old/E07000111.json","data/place_data_less_old/E07000112.json","data/place_data_less_old/E07000113.json","data/place_data_less_old/E07000114.json","data/place_data_less_old/E07000115.json","data/place_data_less_old/E07000116.json","data/place_data_less_old/E07000117.json","data/place_data_less_old/E07000118.json","data/place_data_less_old/E07000119.json","data/place_data_less_old/E07000120.json","data/place_data_less_old/E07000121.json","data/place_data_less_old/E07000122.json","data/place_data_less_old/E07000123.json","data/place_data_less_old/E07000124.json","data/place_data_less_old/E07000125.json","data/place_data_less_old/E07000126.json","data/place_data_less_old/E07000127.json","data/place_data_less_old/E07000128.json","data/place_data_less_old/E07000129.json","data/place_data_less_old/E07000130.json","data/place_data_less_old/E07000131.json","data/place_data_less_old/E07000132.json","data/place_data_less_old/E07000133.json","data/place_data_less_old/E07000134.json","data/place_data_less_old/E07000135.json","data/place_data_less_old/E07000136.json","data/place_data_less_old/E07000137.json","data/place_data_less_old/E07000138.json","data/place_data_less_old/E07000139.json","data/place_data_less_old/E07000140.json","data/place_data_less_old/E07000141.json","data/place_data_less_old/E07000142.json","data/place_data_less_old/E07000143.json","data/place_data_less_old/E07000144.json","data/place_data_less_old/E07000145.json","data/place_data_less_old/E07000146.json","data/place_data_less_old/E07000147.json","data/place_data_less_old/E07000148.json","data/place_data_less_old/E07000149.json","data/place_data_less_old/E07000163.json","data/place_data_less_old/E07000164.json","data/place_data_less_old/E07000165.json","data/place_data_less_old/E07000166.json","data/place_data_less_old/E07000167.json","data/place_data_less_old/E07000168.json","data/place_data_less_old/E07000169.json","data/place_data_less_old/E07000170.json","data/place_data_less_old/E07000171.json","data/place_data_less_old/E07000172.json","data/place_data_less_old/E07000173.json","data/place_data_less_old/E07000174.json","data/place_data_less_old/E07000175.json","data/place_data_less_old/E07000176.json","data/place_data_less_old/E07000177.json","data/place_data_less_old/E07000178.json","data/place_data_less_old/E07000179.json","data/place_data_less_old/E07000180.json","data/place_data_less_old/E07000181.json","data/place_data_less_old/E07000187.json","data/place_data_less_old/E07000188.json","data/place_data_less_old/E07000189.json","data/place_data_less_old/E07000192.json","data/place_data_less_old/E07000193.json","data/place_data_less_old/E07000194.json","data/place_data_less_old/E07000195.json","data/place_data_less_old/E07000196.json","data/place_data_less_old/E07000197.json","data/place_data_less_old/E07000198.json","data/place_data_less_old/E07000199.json","data/place_data_less_old/E07000200.json","data/place_data_less_old/E07000202.json","data/place_data_less_old/E07000203.json","data/place_data_less_old/E07000207.json","data/place_data_less_old/E07000208.json","data/place_data_less_old/E07000209.json","data/place_data_less_old/E07000210.json","data/place_data_less_old/E07000211.json","data/place_data_less_old/E07000212.json","data/place_data_less_old/E07000213.json","data/place_data_less_old/E07000214.json","data/place_data_less_old/E07000215.json","data/place_data_less_old/E07000216.json","data/place_data_less_old/E07000217.json","data/place_data_less_old/E07000218.json","data/place_data_less_old/E07000219.json","data/place_data_less_old/E07000220.json","data/place_data_less_old/E07000221.json","data/place_data_less_old/E07000222.json","data/place_data_less_old/E07000223.json","data/place_data_less_old/E07000224.json","data/place_data_less_old/E07000225.json","data/place_data_less_old/E07000226.json","data/place_data_less_old/E07000227.json","data/place_data_less_old/E07000228.json","data/place_data_less_old/E07000229.json","data/place_data_less_old/E07000234.json","data/place_data_less_old/E07000235.json","data/place_data_less_old/E07000236.json","data/place_data_less_old/E07000237.json","data/place_data_less_old/E07000238.json","data/place_data_less_old/E07000239.json","data/place_data_less_old/E07000240.json","data/place_data_less_old/E07000241.json","data/place_data_less_old/E07000242.json","data/place_data_less_old/E07000243.json","data/place_data_less_old/E07000244.json","data/place_data_less_old/E07000245.json","data/place_data_less_old/E07000246.json","data/place_data_less_old/E08000001.json","data/place_data_less_old/E08000002.json","data/place_data_less_old/E08000003.json","data/place_data_less_old/E08000004.json","data/place_data_less_old/E08000005.json","data/place_data_less_old/E08000006.json","data/place_data_less_old/E08000007.json","data/place_data_less_old/E08000008.json","data/place_data_less_old/E08000009.json","data/place_data_less_old/E08000010.json","data/place_data_less_old/E08000011.json","data/place_data_less_old/E08000012.json","data/place_data_less_old/E08000013.json","data/place_data_less_old/E08000014.json","data/place_data_less_old/E08000015.json","data/place_data_less_old/E08000016.json","data/place_data_less_old/E08000017.json","data/place_data_less_old/E08000018.json","data/place_data_less_old/E08000019.json","data/place_data_less_old/E08000021.json","data/place_data_less_old/E08000022.json","data/place_data_less_old/E08000023.json","data/place_data_less_old/E08000024.json","data/place_data_less_old/E08000025.json","data/place_data_less_old/E08000026.json","data/place_data_less_old/E08000027.json","data/place_data_less_old/E08000028.json","data/place_data_less_old/E08000029.json","data/place_data_less_old/E08000030.json","data/place_data_less_old/E08000031.json","data/place_data_less_old/E08000032.json","data/place_data_less_old/E08000033.json","data/place_data_less_old/E08000034.json","data/place_data_less_old/E08000035.json","data/place_data_less_old/E08000036.json","data/place_data_less_old/E08000037.json","data/place_data_less_old/E09000001.json","data/place_data_less_old/E09000002.json","data/place_data_less_old/E09000003.json","data/place_data_less_old/E09000004.json","data/place_data_less_old/E09000005.json","data/place_data_less_old/E09000006.json","data/place_data_less_old/E09000007.json","data/place_data_less_old/E09000008.json","data/place_data_less_old/E09000009.json","data/place_data_less_old/E09000010.json","data/place_data_less_old/E09000011.json","data/place_data_less_old/E09000012.json","data/place_data_less_old/E09000013.json","data/place_data_less_old/E09000014.json","data/place_data_less_old/E09000015.json","data/place_data_less_old/E09000016.json","data/place_data_less_old/E09000017.json","data/place_data_less_old/E09000018.json","data/place_data_less_old/E09000019.json","data/place_data_less_old/E09000020.json","data/place_data_less_old/E09000021.json","data/place_data_less_old/E09000022.json","data/place_data_less_old/E09000023.json","data/place_data_less_old/E09000024.json","data/place_data_less_old/E09000025.json","data/place_data_less_old/E09000026.json","data/place_data_less_old/E09000027.json","data/place_data_less_old/E09000028.json","data/place_data_less_old/E09000029.json","data/place_data_less_old/E09000030.json","data/place_data_less_old/E09000031.json","data/place_data_less_old/E09000032.json","data/place_data_less_old/E09000033.json","data/place_data_less_old/W06000001.json","data/place_data_less_old/W06000002.json","data/place_data_less_old/W06000003.json","data/place_data_less_old/W06000004.json","data/place_data_less_old/W06000005.json","data/place_data_less_old/W06000006.json","data/place_data_less_old/W06000008.json","data/place_data_less_old/W06000009.json","data/place_data_less_old/W06000010.json","data/place_data_less_old/W06000011.json","data/place_data_less_old/W06000012.json","data/place_data_less_old/W06000013.json","data/place_data_less_old/W06000014.json","data/place_data_less_old/W06000015.json","data/place_data_less_old/W06000016.json","data/place_data_less_old/W06000018.json","data/place_data_less_old/W06000019.json","data/place_data_less_old/W06000020.json","data/place_data_less_old/W06000021.json","data/place_data_less_old/W06000022.json","data/place_data_less_old/W06000023.json","data/place_data_less_old/W06000024.json","data/place_data_less_old/db.sqlite","data/place_data_less_old/lookup.js","data/place_data_less_old/package-lock.json","data/place_data_less_old/server_fives_simplified.js","data/place_data_old/E06000001.json","data/place_data_old/E06000002.json","data/place_data_old/E06000003.json","data/place_data_old/E06000004.json","data/place_data_old/E06000005.json","data/place_data_old/E06000006.json","data/place_data_old/E06000007.json","data/place_data_old/E06000008.json","data/place_data_old/E06000009.json","data/place_data_old/E06000010.json","data/place_data_old/E06000011.json","data/place_data_old/E06000012.json","data/place_data_old/E06000013.json","data/place_data_old/E06000014.json","data/place_data_old/E06000015.json","data/place_data_old/E06000016.json","data/place_data_old/E06000017.json","data/place_data_old/E06000018.json","data/place_data_old/E06000019.json","data/place_data_old/E06000020.json","data/place_data_old/E06000021.json","data/place_data_old/E06000022.json","data/place_data_old/E06000023.json","data/place_data_old/E06000024.json","data/place_data_old/E06000025.json","data/place_data_old/E06000026.json","data/place_data_old/E06000027.json","data/place_data_old/E06000030.json","data/place_data_old/E06000031.json","data/place_data_old/E06000032.json","data/place_data_old/E06000033.json","data/place_data_old/E06000034.json","data/place_data_old/E06000035.json","data/place_data_old/E06000036.json","data/place_data_old/E06000037.json","data/place_data_old/E06000038.json","data/place_data_old/E06000039.json","data/place_data_old/E06000040.json","data/place_data_old/E06000041.json","data/place_data_old/E06000042.json","data/place_data_old/E06000043.json","data/place_data_old/E06000044.json","data/place_data_old/E06000045.json","data/place_data_old/E06000046.json","data/place_data_old/E06000047.json","data/place_data_old/E06000049.json","data/place_data_old/E06000050.json","data/place_data_old/E06000051.json","data/place_data_old/E06000052.json","data/place_data_old/E06000053.json","data/place_data_old/E06000054.json","data/place_data_old/E06000055.json","data/place_data_old/E06000056.json","data/place_data_old/E06000057.json","data/place_data_old/E06000058.json","data/place_data_old/E06000059.json","data/place_data_old/E06000060.json","data/place_data_old/E06000061.json","data/place_data_old/E06000062.json","data/place_data_old/E07000008.json","data/place_data_old/E07000009.json","data/place_data_old/E07000010.json","data/place_data_old/E07000011.json","data/place_data_old/E07000012.json","data/place_data_old/E07000026.json","data/place_data_old/E07000027.json","data/place_data_old/E07000028.json","data/place_data_old/E07000029.json","data/place_data_old/E07000030.json","data/place_data_old/E07000031.json","data/place_data_old/E07000032.json","data/place_data_old/E07000033.json","data/place_data_old/E07000034.json","data/place_data_old/E07000035.json","data/place_data_old/E07000036.json","data/place_data_old/E07000037.json","data/place_data_old/E07000038.json","data/place_data_old/E07000039.json","data/place_data_old/E07000040.json","data/place_data_old/E07000041.json","data/place_data_old/E07000042.json","data/place_data_old/E07000043.json","data/place_data_old/E07000044.json","data/place_data_old/E07000045.json","data/place_data_old/E07000046.json","data/place_data_old/E07000047.json","data/place_data_old/E07000061.json","data/place_data_old/E07000062.json","data/place_data_old/E07000063.json","data/place_data_old/E07000064.json","data/place_data_old/E07000065.json","data/place_data_old/E07000066.json","data/place_data_old/E07000067.json","data/place_data_old/E07000068.json","data/place_data_old/E07000069.json","data/place_data_old/E07000070.json","data/place_data_old/E07000071.json","data/place_data_old/E07000072.json","data/place_data_old/E07000073.json","data/place_data_old/E07000074.json","data/place_data_old/E07000075.json","data/place_data_old/E07000076.json","data/place_data_old/E07000077.json","data/place_data_old/E07000078.json","data/place_data_old/E07000079.json","data/place_data_old/E07000080.json","data/place_data_old/E07000081.json","data/place_data_old/E07000082.json","data/place_data_old/E07000083.json","data/place_data_old/E07000084.json","data/place_data_old/E07000085.json","data/place_data_old/E07000086.json","data/place_data_old/E07000087.json","data/place_data_old/E07000088.json","data/place_data_old/E07000089.json","data/place_data_old/E07000090.json","data/place_data_old/E07000091.json","data/place_data_old/E07000092.json","data/place_data_old/E07000093.json","data/place_data_old/E07000094.json","data/place_data_old/E07000095.json","data/place_data_old/E07000096.json","data/place_data_old/E07000098.json","data/place_data_old/E07000099.json","data/place_data_old/E07000102.json","data/place_data_old/E07000103.json","data/place_data_old/E07000105.json","data/place_data_old/E07000106.json","data/place_data_old/E07000107.json","data/place_data_old/E07000108.json","data/place_data_old/E07000109.json","data/place_data_old/E07000110.json","data/place_data_old/E07000111.json","data/place_data_old/E07000112.json","data/place_data_old/E07000113.json","data/place_data_old/E07000114.json","data/place_data_old/E07000115.json","data/place_data_old/E07000116.json","data/place_data_old/E07000117.json","data/place_data_old/E07000118.json","data/place_data_old/E07000119.json","data/place_data_old/E07000120.json","data/place_data_old/E07000121.json","data/place_data_old/E07000122.json","data/place_data_old/E07000123.json","data/place_data_old/E07000124.json","data/place_data_old/E07000125.json","data/place_data_old/E07000126.json","data/place_data_old/E07000127.json","data/place_data_old/E07000128.json","data/place_data_old/E07000129.json","data/place_data_old/E07000130.json","data/place_data_old/E07000131.json","data/place_data_old/E07000132.json","data/place_data_old/E07000133.json","data/place_data_old/E07000134.json","data/place_data_old/E07000135.json","data/place_data_old/E07000136.json","data/place_data_old/E07000137.json","data/place_data_old/E07000138.json","data/place_data_old/E07000139.json","data/place_data_old/E07000140.json","data/place_data_old/E07000141.json","data/place_data_old/E07000142.json","data/place_data_old/E07000143.json","data/place_data_old/E07000144.json","data/place_data_old/E07000145.json","data/place_data_old/E07000146.json","data/place_data_old/E07000147.json","data/place_data_old/E07000148.json","data/place_data_old/E07000149.json","data/place_data_old/E07000163.json","data/place_data_old/E07000164.json","data/place_data_old/E07000165.json","data/place_data_old/E07000166.json","data/place_data_old/E07000167.json","data/place_data_old/E07000168.json","data/place_data_old/E07000169.json","data/place_data_old/E07000170.json","data/place_data_old/E07000171.json","data/place_data_old/E07000172.json","data/place_data_old/E07000173.json","data/place_data_old/E07000174.json","data/place_data_old/E07000175.json","data/place_data_old/E07000176.json","data/place_data_old/E07000177.json","data/place_data_old/E07000178.json","data/place_data_old/E07000179.json","data/place_data_old/E07000180.json","data/place_data_old/E07000181.json","data/place_data_old/E07000187.json","data/place_data_old/E07000188.json","data/place_data_old/E07000189.json","data/place_data_old/E07000192.json","data/place_data_old/E07000193.json","data/place_data_old/E07000194.json","data/place_data_old/E07000195.json","data/place_data_old/E07000196.json","data/place_data_old/E07000197.json","data/place_data_old/E07000198.json","data/place_data_old/E07000199.json","data/place_data_old/E07000200.json","data/place_data_old/E07000202.json","data/place_data_old/E07000203.json","data/place_data_old/E07000207.json","data/place_data_old/E07000208.json","data/place_data_old/E07000209.json","data/place_data_old/E07000210.json","data/place_data_old/E07000211.json","data/place_data_old/E07000212.json","data/place_data_old/E07000213.json","data/place_data_old/E07000214.json","data/place_data_old/E07000215.json","data/place_data_old/E07000216.json","data/place_data_old/E07000217.json","data/place_data_old/E07000218.json","data/place_data_old/E07000219.json","data/place_data_old/E07000220.json","data/place_data_old/E07000221.json","data/place_data_old/E07000222.json","data/place_data_old/E07000223.json","data/place_data_old/E07000224.json","data/place_data_old/E07000225.json","data/place_data_old/E07000226.json","data/place_data_old/E07000227.json","data/place_data_old/E07000228.json","data/place_data_old/E07000229.json","data/place_data_old/E07000234.json","data/place_data_old/E07000235.json","data/place_data_old/E07000236.json","data/place_data_old/E07000237.json","data/place_data_old/E07000238.json","data/place_data_old/E07000239.json","data/place_data_old/E07000240.json","data/place_data_old/E07000241.json","data/place_data_old/E07000242.json","data/place_data_old/E07000243.json","data/place_data_old/E07000244.json","data/place_data_old/E07000245.json","data/place_data_old/E07000246.json","data/place_data_old/E08000001.json","data/place_data_old/E08000002.json","data/place_data_old/E08000003.json","data/place_data_old/E08000004.json","data/place_data_old/E08000005.json","data/place_data_old/E08000006.json","data/place_data_old/E08000007.json","data/place_data_old/E08000008.json","data/place_data_old/E08000009.json","data/place_data_old/E08000010.json","data/place_data_old/E08000011.json","data/place_data_old/E08000012.json","data/place_data_old/E08000013.json","data/place_data_old/E08000014.json","data/place_data_old/E08000015.json","data/place_data_old/E08000016.json","data/place_data_old/E08000017.json","data/place_data_old/E08000018.json","data/place_data_old/E08000019.json","data/place_data_old/E08000021.json","data/place_data_old/E08000022.json","data/place_data_old/E08000023.json","data/place_data_old/E08000024.json","data/place_data_old/E08000025.json","data/place_data_old/E08000026.json","data/place_data_old/E08000027.json","data/place_data_old/E08000028.json","data/place_data_old/E08000029.json","data/place_data_old/E08000030.json","data/place_data_old/E08000031.json","data/place_data_old/E08000032.json","data/place_data_old/E08000033.json","data/place_data_old/E08000034.json","data/place_data_old/E08000035.json","data/place_data_old/E08000036.json","data/place_data_old/E08000037.json","data/place_data_old/E09000001.json","data/place_data_old/E09000002.json","data/place_data_old/E09000003.json","data/place_data_old/E09000004.json","data/place_data_old/E09000005.json","data/place_data_old/E09000006.json","data/place_data_old/E09000007.json","data/place_data_old/E09000008.json","data/place_data_old/E09000009.json","data/place_data_old/E09000010.json","data/place_data_old/E09000011.json","data/place_data_old/E09000012.json","data/place_data_old/E09000013.json","data/place_data_old/E09000014.json","data/place_data_old/E09000015.json","data/place_data_old/E09000016.json","data/place_data_old/E09000017.json","data/place_data_old/E09000018.json","data/place_data_old/E09000019.json","data/place_data_old/E09000020.json","data/place_data_old/E09000021.json","data/place_data_old/E09000022.json","data/place_data_old/E09000023.json","data/place_data_old/E09000024.json","data/place_data_old/E09000025.json","data/place_data_old/E09000026.json","data/place_data_old/E09000027.json","data/place_data_old/E09000028.json","data/place_data_old/E09000029.json","data/place_data_old/E09000030.json","data/place_data_old/E09000031.json","data/place_data_old/E09000032.json","data/place_data_old/E09000033.json","data/place_data_old/W06000001.json","data/place_data_old/W06000002.json","data/place_data_old/W06000003.json","data/place_data_old/W06000004.json","data/place_data_old/W06000005.json","data/place_data_old/W06000006.json","data/place_data_old/W06000008.json","data/place_data_old/W06000009.json","data/place_data_old/W06000010.json","data/place_data_old/W06000011.json","data/place_data_old/W06000012.json","data/place_data_old/W06000013.json","data/place_data_old/W06000014.json","data/place_data_old/W06000015.json","data/place_data_old/W06000016.json","data/place_data_old/W06000018.json","data/place_data_old/W06000019.json","data/place_data_old/W06000020.json","data/place_data_old/W06000021.json","data/place_data_old/W06000022.json","data/place_data_old/W06000023.json","data/place_data_old/W06000024.json","favicon.ico","global.css","img/bg-dark.jpg","img/ons-logo-black-en.svg","img/ons-logo-neg-en.svg","img/ons-logo-pos-en.svg","img/scroll-down-black.svg","img/scroll-down-white.svg"]),
	_: {
		mime: {".csv":"text/csv",".json":"application/json",".js":"application/javascript",".ico":"image/vnd.microsoft.icon",".css":"text/css",".jpg":"image/jpeg",".svg":"image/svg+xml"},
		entry: {"file":"start-e78187ec.js","js":["start-e78187ec.js","chunks/vendor-fb4d7510.js","chunks/preload-helper-ec9aa979.js","chunks/paths-6758d194.js"],"css":["assets/vendor-4ff902fe.css"]},
		nodes: [
			() => Promise.resolve().then(() => require('../server/nodes/0.js')),
			() => Promise.resolve().then(() => require('../server/nodes/1.js')),
			() => Promise.resolve().then(() => require('../server/nodes/2.js')),
			() => Promise.resolve().then(() => require('../server/nodes/3.js'))
		],
		routes: [
			{
				type: 'page',
				pattern: /^\/$/,
				params: null,
				path: "/",
				a: [0,2],
				b: [1]
			},
			{
				type: 'endpoint',
				pattern: /^\/main\/?$/,
				params: null,
				load: () => Promise.resolve().then(() => require('../server/entries/endpoints/main.js'))
			},
			{
				type: 'page',
				pattern: /^\/([^/]+?)\/?$/,
				params: (m) => ({ code: m[1]}),
				path: null,
				a: [0,3],
				b: [1]
			}
		]
	}
});
