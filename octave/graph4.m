# for annealing-hamming
fid = fopen('../data/hamming/no-annealing-1.txt', 'r', 'native');
fid2 = fopen('../data/hamming/annealing-2.txt', 'r', 'native');
fid3 = fopen('../data.txt', 'r', 'native');

data = fscanf(fid, '%d %d %f %f',[4, Inf]);
data2 = fscanf(fid2, '%d %d %f %f',[4, Inf]);
if fid3 >= 0
	data3 = fscanf(fid3, '%d %d %f %f',[4, Inf]);
end

figure(1);
clf;
hold on;
plot(data(1,:), data(3,:), 'b-', 'linewidth', 3);
plot(data2(1,:), data2(3,:), 'r-', 'linewidth', 3);
if fid3 >= 0
	plot(data3(1,:), data3(3,:), 'g-', 'linewidth', 3);
end

set(gca, 'fontsize', 20);

hx = xlabel('n');
#set(hx, 'fontsize', 14);
hy = ylabel('t');
#set(hy, 'fontsize', 14);

